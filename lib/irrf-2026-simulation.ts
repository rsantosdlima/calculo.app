import {
  PL_REDUCTION_TIER_1_LIMIT,
  PL_REDUCTION_TIER_1_VALUE,
  PL_REDUCTION_TIER_2_LIMIT,
  PL_REDUCTION_TIER_2_CONSTANT,
  PL_REDUCTION_TIER_2_FACTOR
} from "./tax-tables";
// Importa as interfaces e função corretamente
import { calculateSalary, CalculationParams, CalculationResult } from "./salary-calculations";

export interface ComparisonResult {
  current2025: CalculationResult;
  proposed2026: CalculationResult;
  difference: number;
  proposedRuleApplied: boolean;
  reductionValue: number; // Valor exato da redução aplicada
}

export function calculateSimulation2026(params: CalculationParams): ComparisonResult {
  // 1. Calcula o cenário padrão de 2025 (para obter o IRRF atual)
  const current2025 = calculateSalary(params);
  const grossSalary = params.grossSalary;
  const currentIRRF = current2025.irrfDiscount;

  // 2. Calcula o valor da REDUÇÃO baseado na faixa salarial (PL 1087/2025)
  let reductionValue = 0;
  let proposedRuleApplied = false;

  if (grossSalary <= PL_REDUCTION_TIER_1_LIMIT) {
    // FAIXA 1 (Até R$ 5.000,00): Redução fixa de R$ 312,89
    reductionValue = PL_REDUCTION_TIER_1_VALUE;
    proposedRuleApplied = true;

  } else if (grossSalary <= PL_REDUCTION_TIER_2_LIMIT) {
    // FAIXA 2 (De R$ 5.000,01 a R$ 7.350,00): Fórmula
    // Redução = 978,62 - (0,133145 * Salário Bruto)
    reductionValue = PL_REDUCTION_TIER_2_CONSTANT - (PL_REDUCTION_TIER_2_FACTOR * grossSalary);
    // Garante que a redução não seja negativa (embora a fórmula deva garantir isso nessa faixa)
    reductionValue = Math.max(0, reductionValue);
    proposedRuleApplied = true;

  } else {
    // FAIXA 3 (Acima de R$ 7.350,00): Sem redução
    reductionValue = 0;
    proposedRuleApplied = false;
  }

  // 3. Aplica a redução ao IRRF atual
  // O valor da redução não pode ser maior que o próprio imposto devido.
  const finalReduction = Math.min(currentIRRF, reductionValue);
  const proposedIRRF = currentIRRF - finalReduction;

  // 4. Recalcula o salário líquido com o novo IRRF
  // Salário Líquido = Bruto - INSS - Novo IRRF - Pensão - Outros
  const proposedNetSalary =
    grossSalary -
    current2025.inssDiscount -
    proposedIRRF -
    current2025.alimonyDiscount -
    current2025.otherDiscounts;

  const proposed2026: CalculationResult = {
    ...current2025,
    irrfDiscount: proposedIRRF,
    netSalary: proposedNetSalary
  };

  return {
    current2025,
    proposed2026,
    difference: finalReduction, // A diferença é o próprio valor da redução aplicada
    proposedRuleApplied,
    reductionValue: finalReduction
  };
}