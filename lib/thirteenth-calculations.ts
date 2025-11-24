import {
  INSS_TABLE,
  IRRF_TABLE,
  INSS_CEILING,
  IRRF_SIMPLIFIED_DISCOUNT,
  DEPENDENT_DEDUCTION
} from "./tax-tables";

export interface ThirteenthParams {
  grossSalary: number;
  monthsWorked: number; // 1 a 12
  dependents: number;
  firstInstallmentPaid: boolean; // Se já recebeu a 1ª parcela (adiantamento)
}

export interface ThirteenthResult {
  grossTotal: number;        // Valor bruto proporcional aos meses
  firstInstallment: number;  // Valor da 1ª parcela (50% do bruto)
  inssValue: number;
  irrfValue: number;
  totalDiscounts: number;
  secondInstallment: number; // Líquido da 2ª parcela (Bruto - INSS - IRRF - 1ª Parc)
  totalNet: number;          // Soma das duas parcelas líquidas (visão anual)
}

// --- Funções Auxiliares (Reutilizando padrão do projeto) ---

const calculateINSS = (base: number): number => {
  if (base <= 0) return 0;
  if (base > INSS_CEILING) {
    const last = INSS_TABLE[INSS_TABLE.length - 1];
    return last.limit * last.rate - last.deduction;
  }
  for (const faixa of INSS_TABLE) {
    if (base <= faixa.limit) {
      return base * faixa.rate - faixa.deduction;
    }
  }
  // Fallback seguro
  const last = INSS_TABLE[INSS_TABLE.length - 1];
  return base * last.rate - last.deduction;
};

const calculateIRRF = (base: number): number => {
  if (base <= 0) return 0;
  for (const faixa of IRRF_TABLE) {
    if (faixa.limit === null || base <= faixa.limit) {
      return base * faixa.rate - faixa.deduction;
    }
  }
  return 0;
};

export function calculateThirteenth(params: ThirteenthParams): ThirteenthResult {
  const { grossSalary, monthsWorked, dependents, firstInstallmentPaid } = params;

  // 1. Valor Bruto Proporcional
  // Fórmula: (Salário / 12) * Meses Trabalhados
  const grossTotal = (grossSalary / 12) * monthsWorked;

  // 2. Cálculo da 1ª Parcela (Adiantamento)
  // Por lei, corresponde a 50% do valor bruto devido, sem descontos.
  const firstInstallment = grossTotal / 2;

  // 3. Cálculo dos Impostos (Incidem sobre o valor TOTAL bruto)
  // INSS (Tributação exclusiva)
  const inssValue = calculateINSS(grossTotal);

  // IRRF (Tributação exclusiva)
  // Base = Bruto Total - INSS - Dependentes
  const irrfBaseLegal = grossTotal - inssValue - (dependents * DEPENDENT_DEDUCTION);
  const irrfBaseSimpl = grossTotal - IRRF_SIMPLIFIED_DISCOUNT;
  
  const irrfLegal = calculateIRRF(Math.max(0, irrfBaseLegal));
  const irrfSimpl = calculateIRRF(Math.max(0, irrfBaseSimpl));
  
  const irrfValue = Math.min(irrfLegal, irrfSimpl);

  // 4. Cálculo da 2ª Parcela
  // Fórmula: Bruto Total - INSS - IRRF - Valor já pago na 1ª parcela
  // Nota: Se o usuário diz que NÃO recebeu a 1ª parcela ainda, o cálculo mostra
  // o cenário como se ele fosse receber tudo de uma vez (ou as duas parcelas somadas).
  // Mas contabilmente, o 13º é sempre pago em 2x. Vamos focar no "Valor a Receber em Dezembro".
  
  const totalDiscounts = inssValue + irrfValue;
  
  // O valor líquido da 2ª parcela desconta o que já foi adiantado (1ª parcela)
  const secondInstallment = grossTotal - totalDiscounts - firstInstallment;

  // Total Líquido (O que entra no bolso somando Nov + Dez)
  const totalNet = firstInstallment + secondInstallment;

  return {
    grossTotal,
    firstInstallment,
    inssValue,
    irrfValue,
    totalDiscounts,
    secondInstallment, // Líquido final a receber em Dezembro
    totalNet
  };
}