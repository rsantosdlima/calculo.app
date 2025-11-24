import { 
  calculateSalary, 
  CalculationParams 
} from "./salary-calculations"; // Reutilizamos a lógica robusta da CLT

// Tabela Simples Nacional 2025 (Anexo III - Serviços) - Estimativa Simplificada
// Faixas de Faturamento ANUAL (RBT12)
const SIMPLES_TABLE = [
  { limit: 180000, rate: 0.06, deduction: 0 },
  { limit: 360000, rate: 0.112, deduction: 9360 },
  { limit: 720000, rate: 0.135, deduction: 17640 },
  { limit: 1800000, rate: 0.16, deduction: 35640 },
  { limit: 3600000, rate: 0.21, deduction: 125640 },
  { limit: 4800000, rate: 0.33, deduction: 648000 },
];

export interface ComparisonParams {
  cltSalary: number;
  cltBenefits: number; // VR + VA + Saúde (mensal)
  pjMonthlyBilling: number;
  pjAccountantCost: number; // Mensal
}

export interface ComparisonResult {
  clt: {
    monthlyNet: number;
    annualNet: number; // (12 salários + 13º + 1/3 Férias + FGTS) - Descontos
    benefitsAnnual: number;
    fgtsAnnual: number;
    totalPackageAnnual: number;
  };
  pj: {
    monthlyNet: number;
    annualNet: number;
    taxRate: number; // Alíquota efetiva
    totalTaxAnnual: number;
    totalExpensesAnnual: number;
  };
  differenceAnnual: number; // PJ - CLT
  bestOption: "CLT" | "PJ";
}

function calculateSimplesNacional(annualBilling: number): { tax: number, rate: number } {
  // RBT12 - Receita Bruta nos últimos 12 meses
  // Fórmula: (RBT12 * Aliq - Dedução) / RBT12
  
  let bracket = SIMPLES_TABLE[SIMPLES_TABLE.length - 1];
  for (const b of SIMPLES_TABLE) {
    if (annualBilling <= b.limit) {
      bracket = b;
      break;
    }
  }

  const nominalTax = (annualBilling * bracket.rate) - bracket.deduction;
  // Proteção contra imposto negativo em faixas iniciais mal calculadas ou RBT muito baixo
  const finalTax = Math.max(0, nominalTax);
  const effectiveRate = annualBilling > 0 ? finalTax / annualBilling : 0;
  
  return {
    tax: finalTax,
    rate: effectiveRate
  };
}

export function calculateCltPjComparison(params: ComparisonParams): ComparisonResult {
  const { cltSalary, cltBenefits, pjMonthlyBilling, pjAccountantCost } = params;

  // --- LADO CLT ---
  // 1. Salário Líquido Mensal (Usa nossa calculadora existente)
  const cltCalc = calculateSalary({
    grossSalary: cltSalary,
    numDependents: 0,
    otherDiscounts: 0,
    hasAlimony: false,
    alimonyType: "fixed",
    alimonyFixedValue: 0,
    alimonyPercentage: 0,
    alimonyBaseValue: 0
  } as CalculationParams);

  // 2. Pacote Anual CLT
  // 12 meses de salário líquido
  const netYearly = cltCalc.netSalary * 12;
  
  // 13º Salário (estimativa: 1 salário líquido)
  const net13th = cltCalc.netSalary; 
  
  // Férias + 1/3 (estimativa: 1 salário líquido + 1/3 líquido)
  // Nota: Férias são tributadas, mas para simulação simplificada, usamos a base líquida + 1/3.
  const netVacationOneThird = cltCalc.netSalary / 3;
  
  // FGTS (8% do bruto mensal * 13.33 meses - inclui 13º e férias)
  // O FGTS é dinheiro do trabalhador, mesmo que "preso", entra no comparativo de patrimônio.
  const fgtsAnnual = (cltSalary * 0.08) * 13.33;

  // Benefícios (VR/VA não tributáveis)
  const benefitsAnnual = cltBenefits * 12;

  // Total CLT no Bolso/Patrimônio em 1 ano
  const totalCltAnnual = netYearly + net13th + netVacationOneThird + fgtsAnnual + benefitsAnnual;

  // --- LADO PJ ---
  const pjAnnualBilling = pjMonthlyBilling * 12;
  
  // Imposto Simples Nacional (Anexo III)
  const { tax: pjAnnualTax, rate: pjTaxRate } = calculateSimplesNacional(pjAnnualBilling);
  
  // Despesas (Contador)
  const pjAnnualExpenses = pjAccountantCost * 12;

  // Líquido PJ Anual
  const totalPjAnnual = pjAnnualBilling - pjAnnualTax - pjAnnualExpenses;
  const totalPjMonthly = totalPjAnnual / 12;

  return {
    clt: {
      monthlyNet: cltCalc.netSalary,
      annualNet: netYearly + net13th + netVacationOneThird, // Soma dos salários líquidos
      benefitsAnnual,
      fgtsAnnual,
      totalPackageAnnual: totalCltAnnual
    },
    pj: {
      monthlyNet: totalPjMonthly,
      annualNet: totalPjAnnual,
      taxRate: pjTaxRate * 100,
      totalTaxAnnual: pjAnnualTax,
      totalExpensesAnnual: pjAnnualExpenses
    },
    differenceAnnual: totalPjAnnual - totalCltAnnual,
    bestOption: totalPjAnnual > totalCltAnnual ? "PJ" : "CLT"
  };
}