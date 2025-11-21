import {
  INSS_TABLE,
  IRRF_TABLE,
  DEPENDENT_DEDUCTION,
  INSS_CEILING,
  MINIMUM_WAGE,
  IRRF_SIMPLIFIED_DISCOUNT,
  IRRF_2026_REDUCTION_TABLE
} from "./tax-tables";

export enum AlimonyType {
  PERCENT_MIN_WAGE = 1,
  PERCENT_NET_SALARY = 2,
  FIXED_VALUE = 3
}

export interface CalculationParams {
  grossSalary: number;
  dependents: number;
  otherDiscounts: number;
  hasAlimony: boolean;
  alimonyType: AlimonyType;
  alimonyValue: number; // % or R$ depending on type
}

export interface CalculationResult {
  grossSalary: number;
  inss: number;
  irrf: number;
  alimony: number;
  otherDiscounts: number;
  netSalary: number;
  usedSimplified?: boolean; // Indica se usou dedução simplificada no IRRF
}

export function calculateSalary(params: CalculationParams): CalculationResult {
  const { grossSalary, dependents, otherDiscounts, hasAlimony, alimonyType, alimonyValue } = params;

  // 1. Calculate INSS (Fixed based on Gross)
  const inss = calculateINSS(grossSalary);

  // 2. Calculate Alimony & IRRF
  let alimony = 0;
  let irrf = 0;
  let usedSimplified = false;

  if (hasAlimony) {
    if (alimonyType === AlimonyType.FIXED_VALUE) {
      alimony = alimonyValue;
      const irrfResult = calculateIRRFWithFlag(grossSalary, inss, dependents, alimony);
      irrf = irrfResult.irrf;
      usedSimplified = irrfResult.usedSimplified;
    } else if (alimonyType === AlimonyType.PERCENT_MIN_WAGE) {
      alimony = (alimonyValue / 100) * MINIMUM_WAGE;
      const irrfResult = calculateIRRFWithFlag(grossSalary, inss, dependents, alimony);
      irrf = irrfResult.irrf;
      usedSimplified = irrfResult.usedSimplified;
    } else if (alimonyType === AlimonyType.PERCENT_NET_SALARY) {
      // Circular dependency loop with Simplified check inside?

      const percent = alimonyValue / 100;
      let currentIrrf = 0;
      let currentAlimony = 0;
      let currentUsedSimplified = false;

      // Max loops to converge
      for (let i = 0; i < 10; i++) {
        // Alimony = (Gross - INSS - IRRF) * %
        currentAlimony = (grossSalary - inss - currentIrrf) * percent;

        // Calculate IRRF with new Alimony
        const irrfResult = calculateIRRFWithFlag(grossSalary, inss, dependents, currentAlimony);
        const newIrrf = irrfResult.irrf;

        if (Math.abs(newIrrf - currentIrrf) < 0.01) {
          currentIrrf = newIrrf;
          currentUsedSimplified = irrfResult.usedSimplified;
          break;
        }

        currentIrrf = newIrrf;
        currentUsedSimplified = irrfResult.usedSimplified;
      }

      alimony = currentAlimony;
      irrf = currentIrrf;
      usedSimplified = currentUsedSimplified;
    }
  } else {
    const irrfResult = calculateIRRFWithFlag(grossSalary, inss, dependents, 0);
    irrf = irrfResult.irrf;
    usedSimplified = irrfResult.usedSimplified;
  }

  // 3. Net Salary
  const netSalary = grossSalary - inss - irrf - alimony - otherDiscounts;

  return {
    grossSalary,
    inss,
    irrf,
    alimony,
    otherDiscounts,
    netSalary,
    usedSimplified
  };
}

export function calculateINSS(grossSalary: number): number {
  let inss = 0;
  let remainder = Math.min(grossSalary, INSS_CEILING);
  let previousLimit = 0;

  for (const bracket of INSS_TABLE) {
    if (remainder <= 0) break;

    const salaryInBracket = Math.min(grossSalary, bracket.limit) - previousLimit;

    if (salaryInBracket > 0) {
        inss += salaryInBracket * bracket.rate;
    }

    previousLimit = bracket.limit;
  }

  return inss;
}

interface IRRFResult {
    irrf: number;
    usedSimplified: boolean;
}

export function calculateIRRF(grossSalary: number, inss: number, dependents: number, alimony: number): IRRFResult {
  // Strategy 1: Legal Deductions
  const legalDeductions = inss + (dependents * DEPENDENT_DEDUCTION) + alimony;
  const baseLegal = grossSalary - legalDeductions;
  const irrfLegal = calculateBaseIRRF(baseLegal);

  // Strategy 2: Simplified Discount
  const simplifiedDeduction = IRRF_SIMPLIFIED_DISCOUNT;

  // Compare deductions
  if (simplifiedDeduction > legalDeductions) {
      // Use Simplified
      const baseSimplified = grossSalary - simplifiedDeduction;
      const irrfSimplified = calculateBaseIRRF(baseSimplified);
      return { irrf: irrfSimplified, usedSimplified: true };
  } else {
      // Use Legal
      return { irrf: irrfLegal, usedSimplified: false };
  }
}

function calculateBaseIRRF(baseSalary: number): number {
    if (baseSalary <= 0) return 0;

    let irrf = 0;

    for (const bracket of IRRF_TABLE) {
        if (bracket.limit === null || baseSalary <= bracket.limit) {
            irrf = (baseSalary * bracket.rate) - bracket.deduction;
            break;
        }
    }
    return Math.max(0, irrf);
}

// Faixas de redução IRRF 2026 (PL 1.087/2025)
export const IRRF_2026_REDUCTION = [
  {
    min: 0,
    max: 5000,
    reduction: (grossSalary: number) => Math.min(312.89, grossSalary), // até R$ 312,89, imposto zero
  },
  {
    min: 5000.01,
    max: 7350,
    reduction: (grossSalary: number) => 978.62 - (0.133145 * grossSalary),
  }
];

// Novo cálculo IRRF 2026
export function calculateIRRF2026(grossSalary: number, inss: number, dependents: number, alimony: number): { irrf: number, reduction: number, usedSimplified: boolean } {
  const irrfResult = calculateIRRFWithFlag(grossSalary, inss, dependents, alimony);
  let reduction = 0;
  for (const faixa of IRRF_2026_REDUCTION_TABLE) {
    if (grossSalary >= faixa.min && grossSalary <= faixa.max) {
      if (faixa.maxReduction !== undefined) {
        reduction = Math.min(faixa.maxReduction, irrfResult.irrf);
      } else if (faixa.formula) {
        reduction = Math.min(irrfResult.irrf, faixa.formula(grossSalary));
      }
      break;
    }
  }
  const irrf2026 = Math.max(0, irrfResult.irrf - reduction);
  return { irrf: irrf2026, reduction, usedSimplified: irrfResult.usedSimplified };
}

// Nova função para retornar IRRF e flag de dedução simplificada
export function calculateIRRFWithFlag(grossSalary: number, inss: number, dependents: number, alimony: number): { irrf: number, usedSimplified: boolean } {
  const dependentDeduction = dependents * DEPENDENT_DEDUCTION;
  let baseSalary: number;
  let usedSimplified = false;
  if ((inss + dependentDeduction + alimony) < IRRF_SIMPLIFIED_DISCOUNT) {
    baseSalary = grossSalary - IRRF_SIMPLIFIED_DISCOUNT;
    usedSimplified = true;
  } else {
    baseSalary = grossSalary - inss - dependentDeduction - alimony;
  }
  if (baseSalary <= 0) return { irrf: 0, usedSimplified };
  let irrf = 0;
  for (const bracket of IRRF_TABLE) {
    if (bracket.limit === null || baseSalary <= bracket.limit) {
      irrf = (baseSalary * bracket.rate) - bracket.deduction;
      break;
    }
  }
  return { irrf: Math.max(0, irrf), usedSimplified };
}
