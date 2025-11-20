import {
  INSS_TABLE_2024,
  IRRF_TABLE_2024,
  DEPENDENT_DEDUCTION_2024,
  INSS_CEILING_2024,
  MINIMUM_WAGE_2024
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
}

export function calculateSalary(params: CalculationParams): CalculationResult {
  const { grossSalary, dependents, otherDiscounts, hasAlimony, alimonyType, alimonyValue } = params;

  // 1. Calculate INSS (Fixed based on Gross)
  const inss = calculateINSS(grossSalary);

  // 2. Calculate Alimony & IRRF
  let alimony = 0;
  let irrf = 0;

  if (hasAlimony) {
    if (alimonyType === AlimonyType.FIXED_VALUE) {
      alimony = alimonyValue;
      irrf = calculateIRRF(grossSalary, inss, dependents, alimony);
    } else if (alimonyType === AlimonyType.PERCENT_MIN_WAGE) {
      alimony = (alimonyValue / 100) * MINIMUM_WAGE_2024;
      irrf = calculateIRRF(grossSalary, inss, dependents, alimony);
    } else if (alimonyType === AlimonyType.PERCENT_NET_SALARY) {
      // Circular dependency loop
      // Alimony = (Gross - INSS - IRRF) * %
      // IRRF Base = Gross - INSS - Dependents - Alimony

      const percent = alimonyValue / 100;
      let currentIrrf = 0;
      let currentAlimony = 0;

      // Max loops to converge
      for (let i = 0; i < 10; i++) {
        // Step 1: Calculate Alimony based on current IRRF estimate
        // Usually, "Percentage of Net Salary" for alimony implies:
        // Alimony = (Gross - INSS - IRRF) * percent.
        // Wait, is it "Net Salary" = (Gross - INSS - IRRF)? Yes.

        currentAlimony = (grossSalary - inss - currentIrrf) * percent;

        // Step 2: Calculate IRRF based on new Alimony
        const newIrrf = calculateIRRF(grossSalary, inss, dependents, currentAlimony);

        // Check for convergence
        if (Math.abs(newIrrf - currentIrrf) < 0.01) {
          currentIrrf = newIrrf;
          break;
        }

        currentIrrf = newIrrf;
      }

      alimony = currentAlimony;
      irrf = currentIrrf;
    }
  } else {
    irrf = calculateIRRF(grossSalary, inss, dependents, 0);
  }

  // 3. Net Salary
  // Net = Gross - INSS - IRRF - Alimony - OtherDiscounts
  const netSalary = grossSalary - inss - irrf - alimony - otherDiscounts;

  return {
    grossSalary,
    inss,
    irrf,
    alimony,
    otherDiscounts,
    netSalary
  };
}

export function calculateINSS(grossSalary: number): number {
  let inss = 0;
  let remainder = Math.min(grossSalary, INSS_CEILING_2024);
  let previousLimit = 0;

  for (const bracket of INSS_TABLE_2024) {
    if (remainder <= 0) break;

    const salaryInBracket = Math.min(grossSalary, bracket.limit) - previousLimit;

    if (salaryInBracket > 0) {
        inss += salaryInBracket * bracket.rate;
    }

    previousLimit = bracket.limit;
  }

  return inss;
}

export function calculateIRRF(grossSalary: number, inss: number, dependents: number, alimony: number): number {
  const dependentDeduction = dependents * DEPENDENT_DEDUCTION_2024;
  // IRRF Base = Gross - INSS - Dependents - Alimony
  const baseSalary = grossSalary - inss - dependentDeduction - alimony;

  if (baseSalary <= 0) return 0;

  let irrf = 0;

  for (const bracket of IRRF_TABLE_2024) {
    if (bracket.limit === null || baseSalary <= bracket.limit) {
      irrf = (baseSalary * bracket.rate) - bracket.deduction;
      break;
    }
  }

  return Math.max(0, irrf);
}
