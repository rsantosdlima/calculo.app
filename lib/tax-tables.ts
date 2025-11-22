// Table Definitions
export interface TaxBracket {
    limit: number | null; // null means "infinity" / "above X"
    rate: number;
    deduction: number; // For IRRF
  }
  
  // ADICIONADO: 'deduction' também para o INSS para facilitar a exibição e cálculo simplificado
  export interface InssBracket {
    limit: number;
    rate: number;
    deduction: number; 
  }
  
  // INSS Progressive Table (Current Year: 2025)
  // Valores de dedução calculados para a tabela progressiva de 2025
  export const INSS_TABLE: InssBracket[] = [
    { limit: 1518.00, rate: 0.075, deduction: 0.00 },
    { limit: 2793.88, rate: 0.09, deduction: 22.77 },
    { limit: 4190.83, rate: 0.12, deduction: 61.05 },
    { limit: 8157.41, rate: 0.14, deduction: 88.99 },
  ];
  
  // IRRF Table (Current Year: 2025, From May)
  export const IRRF_TABLE: TaxBracket[] = [
    { limit: 2428.80, rate: 0.00, deduction: 0 },
    { limit: 2826.65, rate: 0.075, deduction: 182.16 },
    { limit: 3751.05, rate: 0.15, deduction: 394.16 },
    { limit: 4664.68, rate: 0.225, deduction: 675.49 },
    { limit: null,      rate: 0.275, deduction: 908.73 },
  ];
  
  // Constants (Current Year: 2025)
  export const DEPENDENT_DEDUCTION = 189.59;
  // O teto é o limite da última faixa
  export const INSS_CEILING = INSS_TABLE[INSS_TABLE.length - 1].limit; 
  export const MINIMUM_WAGE = 1518.00;
  export const IRRF_SIMPLIFIED_DISCOUNT = 607.20;
  
  // PL 1.087/2025 - IRRF Reduction Parameters (Simulation)
  // Mantido conforme seu código original
  export const PL_REDUCTION_TIER_1_LIMIT = 5000.00;
  export const PL_REDUCTION_TIER_1_VALUE = 312.89; 
  
  export const PL_REDUCTION_TIER_2_LIMIT = 7350.00;
  export const PL_REDUCTION_TIER_2_FIXED = 978.62;
  export const PL_REDUCTION_TIER_2_FACTOR = 0.133145;
