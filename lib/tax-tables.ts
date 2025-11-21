// Table Definitions
export interface TaxBracket {
  limit: number | null; // null means "infinity" / "above X"
  rate: number;
  deduction: number; // For IRRF
}

export interface InssBracket {
  limit: number;
  rate: number;
}

// INSS 2025 Progressive Table
export const INSS_TABLE_2025: InssBracket[] = [
  { limit: 1518.00, rate: 0.075 },
  { limit: 2793.88, rate: 0.09 },
  { limit: 4190.83, rate: 0.12 },
  { limit: 8157.41, rate: 0.14 },
];

// IRRF 2025 Table (From May 2025)
export const IRRF_TABLE_2025: TaxBracket[] = [
  { limit: 2428.80, rate: 0.00, deduction: 0 },
  { limit: 2826.65, rate: 0.075, deduction: 182.16 },
  { limit: 3751.05, rate: 0.15, deduction: 394.16 },
  { limit: 4664.68, rate: 0.225, deduction: 675.49 },
  { limit: null,    rate: 0.275, deduction: 908.73 },
];

// Constants
export const DEPENDENT_DEDUCTION_2025 = 189.59;
export const INSS_CEILING_2025 = 8157.41;
export const MINIMUM_WAGE_2025 = 1518.00;
export const IRRF_SIMPLIFIED_DISCOUNT_2025 = 607.20;
