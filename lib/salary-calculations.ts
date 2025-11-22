import {
  INSS_TABLE,
  IRRF_TABLE,
  DEPENDENT_DEDUCTION,
  IRRF_SIMPLIFIED_DISCOUNT,
  INSS_CEILING,
} from "./tax-tables";

export type AlimonyType = "fixed" | "percentage";

export interface CalculationResult {
  grossSalary: number;
  inssDiscount: number;
  irrfDiscount: number;
  otherDiscounts: number;
  alimonyDiscount: number;
  netSalary: number;
  irrfBase: number;
  usedSimplifiedDiscount: boolean;
}

// --- FUNÇÕES AUXILIARES INTERNAS ---

const calculateINSS = (grossSalary: number): number => {
  // 1. Verifica Teto
  if (grossSalary > INSS_CEILING) {
    const lastBracket = INSS_TABLE[INSS_TABLE.length - 1];
    return lastBracket.limit * lastBracket.rate - lastBracket.deduction;
  }

  // 2. Cálculo Progressivo
  let totalINSS = 0;
  for (const bracket of INSS_TABLE) {
    if (grossSalary > bracket.limit) {
      continue;
    } else {
      totalINSS = grossSalary * bracket.rate - bracket.deduction;
      break;
    }
  }
  return totalINSS;
};

const calculateIRRF = (baseSalary: number): number => {
  if (baseSalary <= 0) return 0;
  for (const bracket of IRRF_TABLE) {
    if (bracket.limit === null || baseSalary <= bracket.limit) {
      return baseSalary * bracket.rate - bracket.deduction;
    }
  }
  return 0;
};

// --- FUNÇÃO PRINCIPAL EXPORTADA ---

export function calculateSalary(
  grossSalary: number,
  numDependents: number,
  otherDiscounts: number,
  hasAlimony: boolean,
  alimonyType: AlimonyType,
  alimonyFixedValue: number,
  alimonyPercentage: number,
  alimonyBaseValue: number
): CalculationResult {
  // 1. Calcula INSS
  const inssDiscount = calculateINSS(grossSalary);

  // 2. Calcula Pensão Alimentícia
  let alimonyDiscount = 0;
  if (hasAlimony) {
    if (alimonyType === "fixed") {
      alimonyDiscount = alimonyFixedValue;
    } else {
      // Se a base for 0 ou não informada, usa o salário bruto como padrão
      const base = alimonyBaseValue > 0 ? alimonyBaseValue : grossSalary;
      alimonyDiscount = base * (alimonyPercentage / 100);
    }
  }

  // 3. Calcula IRRF (Comparativo)
  // Base Legal: Bruto - INSS - Dependentes - Pensão
  const totalDependentDeduction = numDependents * DEPENDENT_DEDUCTION;
  const irrfBaseLegal =
    grossSalary - inssDiscount - totalDependentDeduction - alimonyDiscount;
  const irrfLegal = calculateIRRF(irrfBaseLegal);

  // Base Simplificada: Bruto - Desconto Padrão (Pensão NÃO deduz aqui)
  const irrfBaseSimplified = grossSalary - IRRF_SIMPLIFIED_DISCOUNT;
  const irrfSimplified = calculateIRRF(irrfBaseSimplified);

  // Escolhe o mais vantajoso
  let irrfDiscount = 0;
  let usedSimplifiedDiscount = false;
  let finalIrrfBase = 0;

  if (irrfSimplified < irrfLegal && irrfSimplified >= 0) {
    irrfDiscount = irrfSimplified;
    usedSimplifiedDiscount = true;
    finalIrrfBase = irrfBaseSimplified;
  } else {
    irrfDiscount = Math.max(0, irrfLegal);
    usedSimplifiedDiscount = false;
    finalIrrfBase = irrfBaseLegal;
  }

  // 4. Calcula Salário Líquido Final
  const netSalary =
    grossSalary -
    inssDiscount -
    irrfDiscount -
    alimonyDiscount -
    otherDiscounts;

  return {
    grossSalary,
    inssDiscount,
    irrfDiscount,
    otherDiscounts,
    alimonyDiscount,
    netSalary,
    irrfBase: Math.max(0, finalIrrfBase),
    usedSimplifiedDiscount,
  };
}