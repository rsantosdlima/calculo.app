import {
  INSS_TABLE_2025,
  IRRF_TABLE_2025,
  DEPENDENT_DEDUCTION_2025,
  INSS_CEILING_2025,
<<<<<<< HEAD
  MINIMUM_WAGE_2025
  MINIMUM_WAGE_2025,
  IRRF_SIMPLIFIED_DISCOUNT_2025
=======
  MINIMUM_WAGE_2025,
  SIMPLIFIED_DEDUCTION_2025
>>>>>>> 3bc7849 (ajuste no cálculo do irrf para 2025 com dedução simplificada)
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
      alimony = (alimonyValue / 100) * MINIMUM_WAGE_2025;
      irrfResult = calculateIRRF(grossSalary, inss, dependents, alimony);
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
  let remainder = Math.min(grossSalary, INSS_CEILING_2025);
  let previousLimit = 0;

  for (const bracket of INSS_TABLE_2025) {
    if (remainder <= 0) break;

    const salaryInBracket = Math.min(grossSalary, bracket.limit) - previousLimit;

    if (salaryInBracket > 0) {
        inss += salaryInBracket * bracket.rate;
    }

    previousLimit = bracket.limit;
  }

  return inss;
}

<<<<<<< HEAD
interface IRRFResult {
    irrf: number;
    usedSimplified: boolean;
}

export function calculateIRRF(grossSalary: number, inss: number, dependents: number, alimony: number): IRRFResult {
  // Strategy 1: Legal Deductions
  const legalDeductions = inss + (dependents * DEPENDENT_DEDUCTION_2025) + alimony;
  const baseLegal = grossSalary - legalDeductions;
  const irrfLegal = calculateBaseIRRF(baseLegal);

  // Strategy 2: Simplified Discount
  const simplifiedDeduction = IRRF_SIMPLIFIED_DISCOUNT_2025;

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

    for (const bracket of IRRF_TABLE_2025) {
        if (bracket.limit === null || baseSalary <= bracket.limit) {
            irrf = (baseSalary * bracket.rate) - bracket.deduction;
            break;
        }
    }
    return Math.max(0, irrf);
=======
export function calculateIRRF(grossSalary: number, inss: number, dependents: number, alimony: number): number {
  const dependentDeduction = dependents * DEPENDENT_DEDUCTION_2024;
  // Se a soma das deduções for menor que a dedução simplificada, usa a dedução simplificada
  let baseSalary: number;
  if ((inss + dependentDeduction + alimony) < SIMPLIFIED_DEDUCTION_2025) {
    baseSalary = grossSalary - SIMPLIFIED_DEDUCTION_2025;
  } else {
    baseSalary = grossSalary - inss - dependentDeduction - alimony;
  }

  if (baseSalary <= 0) return 0;

  let irrf = 0;

  for (const bracket of IRRF_TABLE_2024) {
    if (bracket.limit === null || baseSalary <= bracket.limit) {
      irrf = (baseSalary * bracket.rate) - bracket.deduction;
      break;
    }
  }

  return Math.max(0, irrf);
>>>>>>> 3bc7849 (ajuste no cálculo do irrf para 2025 com dedução simplificada)
}
