// Definindo a interface do resultado (Nome correto: SimpleInterestResult)
export interface SimpleInterestResult {
  principal: number;
  rate: number;
  time: number;
  totalInterest: number;
  totalAmount: number;
}

// A função principal que aceita os valores e os tipos de período como TEXTO ("monthly" | "yearly")
export function calculateSimpleInterest(
  principal: number,
  rate: number,
  time: number,
  ratePeriod: "monthly" | "yearly", // <-- Aceita string
  timePeriod: "months" | "years"    // <-- Aceita string
): SimpleInterestResult {
  let adjustedRate = rate / 100;
  let adjustedTime = time;

  // Lógica para padronizar tudo para a mesma base (meses) se necessário
  if (ratePeriod === "yearly" && timePeriod === "months") {
    // Taxa anual, tempo em meses: divide a taxa por 12
    adjustedRate = adjustedRate / 12;
  } else if (ratePeriod === "monthly" && timePeriod === "years") {
    // Taxa mensal, tempo em anos: multiplica o tempo por 12
    adjustedTime = adjustedTime * 12;
  }
  // Se ambos forem iguais (ambos meses ou ambos anos), não precisa ajustar.

  // Fórmula J = C * i * t
  const totalInterest = principal * adjustedRate * adjustedTime;
  // Montante = C + J
  const totalAmount = principal + totalInterest;

  return {
    principal,
    rate,
    time,
    totalInterest,
    totalAmount,
  };
}