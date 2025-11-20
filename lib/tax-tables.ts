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

// INSS 2024 Progressive Table
// Tiers applied sequentially on the remaining balance
export const INSS_TABLE_2024: InssBracket[] = [
  { limit: 1412.00, rate: 0.075 },
  { limit: 2666.68, rate: 0.09 },
  { limit: 4000.03, rate: 0.12 },
  { limit: 7786.02, rate: 0.14 },
];

// IRRF 2024 Table (Monthly)
export const IRRF_TABLE_2024: TaxBracket[] = [
  { limit: 2259.20, rate: 0.00, deduction: 0 },
  { limit: 2826.65, rate: 0.075, deduction: 169.44 },
  { limit: 3751.05, rate: 0.15, deduction: 381.44 },
  { limit: 4664.68, rate: 0.225, deduction: 662.77 },
  { limit: null,    rate: 0.275, deduction: 896.00 },
];

// Constants
export const DEPENDENT_DEDUCTION_2024 = 189.59;
export const INSS_CEILING_2024 = 7786.02;
export const MINIMUM_WAGE_2024 = 1412.00;
