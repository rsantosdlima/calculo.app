import {
  PL_PROPOSED_LIMIT_TIER_1,
  PL_REDUCTION_TIER_1_VALUE,
  PL_PROPOSED_LIMIT_TIER_2,
  PL_REDUCTION_TIER_2_FACTOR
} from "./tax-tables";
import { calculateSalary, CalculationParams, CalculationResult } from "./salary-calculations";

export interface ComparisonResult {
  current2025: CalculationResult;
  proposed2026: CalculationResult;
  difference: number;
  proposedRuleApplied: boolean;
  tierApplied: 1 | 2 | null;
}

export function calculateSimulation2026(params: CalculationParams): ComparisonResult {
  // 1. Calcula cenário padrão de 2025
  const current2025 = calculateSalary(params);

  // 2. Calcula cenário 2026 baseado no resultado de 2025 + ajustes
  // A proposta de 2026 REDUZ o IRRF calculado sob as regras atuais.

  let proposedIRRF = current2025.irrfDiscount;
  let proposedRuleApplied = false;
  let tierApplied: 1 | 2 | null = null;
  const grossSalary = params.grossSalary;

  if (grossSalary <= PL_PROPOSED_LIMIT_TIER_1) {
    // Faixa 1: Redução fixa de R$ 600,00 no imposto devido
    proposedIRRF = Math.max(0, current2025.irrfDiscount - PL_REDUCTION_TIER_1_VALUE);
    proposedRuleApplied = true;
    tierApplied = 1;
  } else if (grossSalary <= PL_PROPOSED_LIMIT_TIER_2) {
    // Faixa 2: Redução variável (fator 0.25)
    // O texto do PL é complexo aqui, mas a interpretação mais comum para simulação
    // é uma redução gradual que zera no limite superior.
    // Simplificação para simulação: Redução linear proporcional
    const reduction = PL_REDUCTION_TIER_1_VALUE * (1 - ((grossSalary - PL_PROPOSED_LIMIT_TIER_1) / (PL_PROPOSED_LIMIT_TIER_2 - PL_PROPOSED_LIMIT_TIER_1)));

    proposedIRRF = Math.max(0, current2025.irrfDiscount - reduction);
    proposedRuleApplied = true;
    tierApplied = 2;
  }
  // Se maior que TIER_2, mantém o IRRF atual (proposedIRRF já começa com esse valor)

  const difference = current2025.irrfDiscount - proposedIRRF;
  const proposedNetSalary = current2025.netSalary + difference;

  const proposed2026: CalculationResult = {
    ...current2025,
    irrfDiscount: proposedIRRF,
    netSalary: proposedNetSalary
  };

  return {
    current2025,
    proposed2026,
    difference,
    proposedRuleApplied,
    tierApplied
  };
}