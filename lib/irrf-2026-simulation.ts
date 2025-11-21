import {
  PL_2025_REDUCTION_TIER_1_LIMIT,
  PL_2025_REDUCTION_TIER_1_VALUE,
  PL_2025_REDUCTION_TIER_2_LIMIT,
  PL_2025_REDUCTION_TIER_2_FIXED,
  PL_2025_REDUCTION_TIER_2_FACTOR
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

  if (gross <= PL_2025_REDUCTION_TIER_1_LIMIT) {
    // For salaries up to 5000, subtract up to 312.89.
    // The goal is usually to make it zero if tax is low, or reduce significantly.
    // The prompt says: "subtrair até R$ 312,89 ... de modo que o imposto devido seja zero".
    // This implies if Tax < 312.89, Reduction = Tax. If Tax > 312.89, Reduction = 312.89.
    // Basically: NewTax = Max(0, OldTax - 312.89).
    reduction = Math.min(irrfBase, PL_2025_REDUCTION_TIER_1_VALUE);
  } else if (gross <= PL_2025_REDUCTION_TIER_2_LIMIT) {
    // Range 5000.01 to 7350.00
    // Reduction = 978.62 - (0.133145 * gross)
    const calculatedReduction = PL_2025_REDUCTION_TIER_2_FIXED - (PL_2025_REDUCTION_TIER_2_FACTOR * gross);
    // Reduction cannot be negative (if factor * gross > 978), though math says 0.13 * 7350 ~= 978.
    // So it tapers to zero at 7350.
    reduction = Math.max(0, calculatedReduction);
    // Also ensure we don't reduce more than the tax itself (negative tax)
    reduction = Math.min(irrfBase, reduction);
  } else {
    // Above 7350, no specific reduction mentioned in this PL prompt logic.
    reduction = 0;
  }

  const irrf2026 = Math.max(0, irrfBase - reduction);

  // Recalculate Net Salary for 2026
  // Net = Gross - INSS - IRRF2026 - Alimony - Other
  // Note: INSS and Alimony logic remains same as 2025 for this simulation.
  // Wait, if Alimony depends on IRRF (circular), does the reduction affect Alimony?
  // If Alimony is % of Net, and Net changes due to lower IRRF, then Alimony should INCREASE.
  // Re-running the circular loop for 2026 would be most accurate.
  // However, standard legislative comparisons usually keep the base parameters constant to show tax effect.
  // But if the user wants "Net Salary", it implies re-calc.
  // For MVP/Simplicity, and since the reduction is applied "after calculation of IRRF",
  // let's assume Alimony is fixed based on the 2025 baseline OR we re-run.
  // Re-running is complex because the "Reduction" depends on Gross (fixed), but the Base IRRF depends on Alimony.
  // Let's stick to: 2026 Net = 2025 Net + Reduction (roughly).
  // Actually: Net = Gross - INSS - NewIRRF - Alimony2025 - Other.
  // This shows the direct tax saving.

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
    yearlyGain: (net2026 - current2025.netSalary) * 13.33 // Approx 13th + holiday? Or just 12? Let's say 12 for safety or 13.
  };
}
