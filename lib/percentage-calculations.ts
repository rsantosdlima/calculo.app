// Tipos de operação disponíveis no menu suspenso
export type PercentageOperationType =
  | "increase"
  | "discount"
  | "difference"
  | "representation";

// Interfaces para os resultados de cada tipo de operação
export interface IncreaseResult {
  type: "increase";
  initialValue: number;
  percentage: number;
  increaseAmount: number; // O valor em R$ que foi acrescido
  finalValue: number; // O montante final
}

export interface DiscountResult {
  type: "discount";
  initialValue: number;
  percentage: number;
  discountAmount: number; // O valor em R$ que foi descontado
  finalValue: number; // O montante final
}

export interface DifferenceResult {
  type: "difference";
  initialValue: number;
  finalValue: number;
  differenceAmount: number; // Diferença em R$
  percentageChange: number; // A variação percentual (pode ser negativa)
}

export interface RepresentationResult {
  type: "representation";
  totalValue: number;
  partialValue: number;
  percentage: number; // Quanto a parte representa do todo em %
}

// União dos possíveis resultados para usar no estado do componente
export type PercentageCalculationResult =
  | IncreaseResult
  | DiscountResult
  | DifferenceResult
  | RepresentationResult;

/**
 * 1. Calcula Acréscimo
 * Ex: R$ 100,00 + 10% = R$ 10,00 de aumento e R$ 110,00 final.
 */
export function calculateIncrease(
  initialValue: number,
  percentage: number
): IncreaseResult {
  const increaseAmount = initialValue * (percentage / 100);
  const finalValue = initialValue + increaseAmount;

  return {
    type: "increase",
    initialValue,
    percentage,
    increaseAmount,
    finalValue,
  };
}

/**
 * 2. Calcula Desconto
 * Ex: R$ 100,00 - 10% = R$ 10,00 de desconto e R$ 90,00 final.
 */
export function calculateDiscount(
  initialValue: number,
  percentage: number
): DiscountResult {
  const discountAmount = initialValue * (percentage / 100);
  const finalValue = initialValue - discountAmount;

  return {
    type: "discount",
    initialValue,
    percentage,
    discountAmount,
    finalValue,
  };
}

/**
 * 3. Calcula a Diferença Percentual entre dois valores (Variação)
 * Ex: De R$ 100 para R$ 120 = aumento de 20%. De R$ 100 para R$ 80 = queda de -20%.
 * Fórmula: ((Valor Final - Valor Inicial) / Valor Inicial) * 100
 */
export function calculateDifference(
  initialValue: number,
  finalValue: number
): DifferenceResult {
  const differenceAmount = finalValue - initialValue;
  // Evita divisão por zero
  if (initialValue === 0) {
    return {
      type: "difference",
      initialValue,
      finalValue,
      differenceAmount,
      percentageChange: finalValue > 0 ? Infinity : finalValue < 0 ? -Infinity : 0,
    };
  }

  const percentageChange = ((finalValue - initialValue) / initialValue) * 100;

  return {
    type: "difference",
    initialValue,
    finalValue,
    differenceAmount,
    percentageChange,
  };
}

/**
 * 4. Calcula Representatividade (Quanto X é de Y?)
 * Ex: Quanto R$ 25 representa de R$ 100? Resposta: 25%.
 * Fórmula: (Parte / Total) * 100
 */
export function calculateRepresentation(
  totalValue: number,
  partialValue: number
): RepresentationResult {
  // Evita divisão por zero
  if (totalValue === 0) {
    return {
      type: "representation",
      totalValue,
      partialValue,
      percentage: 0,
    };
  }

  const percentage = (partialValue / totalValue) * 100;

  return {
    type: "representation",
    totalValue,
    partialValue,
    percentage,
  };
}