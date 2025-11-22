// ==========================================
// DADOS VIGENTES PARA 2025 (FONTE OFICIAL)
// ==========================================

// Teto máximo do salário de contribuição do INSS para 2025
// (Valor projetado com base no aumento do salário mínimo, confirmar valor oficial quando publicado pela portaria interministerial)
export const INSS_CEILING = 8157.41;

// Tabela Progressiva INSS 2025 (Vigente)
export const INSS_TABLE = [
  { limit: 1518.00, rate: 0.075, deduction: 0.00 }, // 1 salário mínimo 2025
  { limit: 2793.88, rate: 0.09, deduction: 22.77 },
  { limit: 4190.83, rate: 0.12, deduction: 106.40 },
  { limit: INSS_CEILING, rate: 0.14, deduction: 190.40 },
];

// Dedução por dependente no IRRF (Valor fixo mensal)
export const DEPENDENT_DEDUCTION = 189.59;

// Desconto Simplificado Mensal (Padrão IRRF)
export const IRRF_SIMPLIFIED_DISCOUNT = 607.20;

// Tabela Progressiva IRRF Mensal (Vigente desde Mai/2025)
// O limite null na última faixa indica que é para valores acima do limite anterior.
export const IRRF_TABLE: {
  limit: number | null;
  rate: number;
  deduction: number;
}[] = [
  { limit: 2428.80, rate: 0.0, deduction: 0.0 }, // Faixa de Isenção
  { limit: 2826.65, rate: 0.075, deduction: 182.16 },
  { limit: 3751.05, rate: 0.15, deduction: 394.16 },
  { limit: 4664.68, rate: 0.225, deduction: 675.49 },
  { limit: null, rate: 0.275, deduction: 908.73 }, // Acima de 4664.68
];

// =========================================================
// NOVAS CONSTANTES PARA O PL 1087/2025 (SIMULAÇÃO 2026)
// Fonte: Análise corrigida do texto do Projeto de Lei.
// =========================================================

// --- FAIXA 1 DE REDUÇÃO ---
// Limite de salário bruto para a primeira faixa de redução
export const PL_REDUCTION_TIER_1_LIMIT = 5000.00;
// Valor fixo de redução do IRRF nesta faixa
export const PL_REDUCTION_TIER_1_VALUE = 312.89;

// --- FAIXA 2 DE REDUÇÃO (Fórmula: 978.62 - 0.133145 * Salário) ---
// Limite superior da segunda faixa (limite para ter direito à redução)
export const PL_REDUCTION_TIER_2_LIMIT = 7350.00;
// Constante da fórmula
export const PL_REDUCTION_TIER_2_CONSTANT = 978.62;
// Fator multiplicador da fórmula
export const PL_REDUCTION_TIER_2_FACTOR = 0.133145;