import {
  PL_REDUCTION_TIER_1_LIMIT,
  PL_REDUCTION_TIER_1_VALUE,
  PL_REDUCTION_TIER_2_LIMIT,
  PL_REDUCTION_TIER_2_FIXED,
  PL_REDUCTION_TIER_2_FACTOR
} from "./tax-tables";
import { calculateSalary, CalculationParams, CalculationResult } from "./salary-calculations";

export interface ComparisonResult {
  current2025: CalculationResult;
  simulated2026: CalculationResult & {
    reductionAmount: number; // How much tax was saved
  };
  monthlyGain: number;
  yearlyGain: number;
}

export function calculateSimulation2026(params: CalculationParams): ComparisonResult {
  // 1. Calculate standard 2025 scenario
  const current2025 = calculateSalary(params);

  // 2. Calculate 2026 scenario based on 2025 result + adjustments
  // The 2026 proposal REDUCES the IRRF calculated under current rules (or 2025 rules).
  // So we start with the IRRF from step 1.

  const irrfBase = current2025.irrf;
  let reduction = 0;
  const gross = params.grossSalary;

  if (gross <= PL_REDUCTION_TIER_1_LIMIT) {
    // For salaries up to 5000, subtract up to 312.89.
    reduction = Math.min(irrfBase, PL_REDUCTION_TIER_1_VALUE);
  } else if (gross <= PL_REDUCTION_TIER_2_LIMIT) {
    // Range 5000.01 to 7350.00
    const calculatedReduction = PL_REDUCTION_TIER_2_FIXED - (PL_REDUCTION_TIER_2_FACTOR * gross);
    reduction = Math.max(0, calculatedReduction);
    reduction = Math.min(irrfBase, reduction);
  } else {
    // Above 7350, no specific reduction.
    reduction = 0;
  }

  const irrf2026 = Math.max(0, irrfBase - reduction);

  // Recalculate Net Salary for 2026
  const net2026 = params.grossSalary - current2025.inss - irrf2026 - current2025.alimony - params.otherDiscounts;

  return {
    current2025,
    simulated2026: {
      ...current2025,
      irrf: irrf2026,
      netSalary: net2026,
      reductionAmount: reduction
    },
    monthlyGain: net2026 - current2025.netSalary,
    yearlyGain: (net2026 - current2025.netSalary) * 13.33
  };
}
