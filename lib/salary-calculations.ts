import {
  INSS_TABLE,
  IRRF_TABLE,
  DEPENDENT_DEDUCTION,
  INSS_CEILING,
  MINIMUM_WAGE,
  IRRF_SIMPLIFIED_DISCOUNT
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
  usedSimplified: boolean; // To display which method was used
}

export function calculateSalary(params: CalculationParams): CalculationResult {
  const { grossSalary, dependents, otherDiscounts, hasAlimony, alimonyType, alimonyValue } = params;

  // 1. Calculate INSS (Fixed based on Gross)
  const inss = calculateINSS(grossSalary);

  // 2. Calculate Alimony & IRRF
  let alimony = 0;
  let irrfResult = { irrf: 0, usedSimplified: false };

  if (hasAlimony) {
    if (alimonyType === AlimonyType.FIXED_VALUE) {
      alimony = alimonyValue;
      irrfResult = calculateIRRF(grossSalary, inss, dependents, alimony);
    } else if (alimonyType === AlimonyType.PERCENT_MIN_WAGE) {
      alimony = (alimonyValue / 100) * MINIMUM_WAGE;
      irrfResult = calculateIRRF(grossSalary, inss, dependents, alimony);
    } else if (alimonyType === AlimonyType.PERCENT_NET_SALARY) {
      // Circular dependency loop
      const percent = alimonyValue / 100;
      let currentIrrf = 0;
      let currentAlimony = 0;
      let currentUsedSimplified = false;

      for (let i = 0; i < 10; i++) {
        currentAlimony = (grossSalary - inss - currentIrrf) * percent;
        const res = calculateIRRF(grossSalary, inss, dependents, currentAlimony);

        if (Math.abs(res.irrf - currentIrrf) < 0.01) {
          currentIrrf = res.irrf;
          currentUsedSimplified = res.usedSimplified;
          break;
        }

        currentIrrf = res.irrf;
        currentUsedSimplified = res.usedSimplified;
      }

      alimony = currentAlimony;
      irrfResult = { irrf: currentIrrf, usedSimplified: currentUsedSimplified };
    }
  } else {
    irrfResult = calculateIRRF(grossSalary, inss, dependents, 0);
  }

  // 3. Net Salary
  const netSalary = grossSalary - inss - irrfResult.irrf - alimony - otherDiscounts;

  return {
    grossSalary,
    inss,
    irrf: irrfResult.irrf,
    alimony,
    otherDiscounts,
    netSalary,
    usedSimplified: irrfResult.usedSimplified
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
