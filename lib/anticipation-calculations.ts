export interface AnticipationParams {
  installmentValue: number;
  annualRate: number;
  quantityToPay: number;
  strategy: "beginning" | "end"; // "Início (Próximas)" ou "Fim (Últimas)"
  totalRemaining?: number; // Obrigatório se strategy == 'end'
}

export interface AnticipationResult {
  originalTotal: number;
  amountToPay: number;
  totalDiscount: number;
  discountPercentage: number;
}

export function calculateAnticipation({
  installmentValue,
  annualRate,
  quantityToPay,
  strategy,
  totalRemaining = 0,
}: AnticipationParams): AnticipationResult {
  // 1. Taxa Mensal
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  
  let presentValueSum = 0;
  let originalSum = installmentValue * quantityToPay;

  // 2. Definição do intervalo de tempo (t)
  // Se for "Início", antecipa as parcelas 1, 2, 3... até N.
  // Se for "Fim", antecipa as parcelas (Total), (Total-1)... até (Total-N+1).
  
  let startMonth = 1;
  let endMonth = quantityToPay;

  if (strategy === "end") {
    // Ex: Faltam 10 (totalRemaining). Quero pagar 3 (quantityToPay) do final.
    // Vou pagar as parcelas 8, 9 e 10.
    // t = 8, 9, 10.
    startMonth = totalRemaining - quantityToPay + 1;
    endMonth = totalRemaining;
  }

  // 3. Cálculo do Valor Presente (PV) para cada parcela
  // Fórmula: PV = FV / (1 + i)^t
  for (let t = startMonth; t <= endMonth; t++) {
    const pv = installmentValue / Math.pow(1 + monthlyRate, t);
    presentValueSum += pv;
  }

  return {
    originalTotal: originalSum,
    amountToPay: presentValueSum,
    totalDiscount: originalSum - presentValueSum,
    discountPercentage: ((originalSum - presentValueSum) / originalSum) * 100
  };
}