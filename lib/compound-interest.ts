export interface CompoundInterestParams {
  initialValue: number;
  monthlyValue: number;
  interestRate: number;
  ratePeriod: "monthly" | "yearly";
  periodValue: number;
  periodType: "months" | "years";
}

export interface YearlyResult {
  year: number;
  invested: number;
  interest: number;
  total: number;
}

export interface CompoundInterestResult {
  totalInvested: number;
  totalInterest: number;
  totalAmount: number;
  yearlyBreakdown: YearlyResult[]; // Para gráficos ou tabelas futuras
}

export function calculateCompoundInterest({
  initialValue,
  monthlyValue,
  interestRate,
  ratePeriod,
  periodValue,
  periodType,
}: CompoundInterestParams): CompoundInterestResult {
  // 1. Normalizar Taxa para Mensal
  let monthlyRate = 0;
  if (ratePeriod === "monthly") {
    monthlyRate = interestRate / 100;
  } else {
    // Taxa equivalente mensal: (1 + i_a)^(1/12) - 1
    monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
  }

  // 2. Normalizar Período para Meses
  const totalMonths = periodType === "months" ? periodValue : periodValue * 12;

  let currentTotal = initialValue;
  let totalInvested = initialValue;
  const yearlyBreakdown: YearlyResult[] = [];

  // Loop mês a mês para precisão e construção do histórico
  for (let m = 1; m <= totalMonths; m++) {
    // Aplica juros sobre o montante anterior
    currentTotal = currentTotal * (1 + monthlyRate);
    
    // Adiciona o aporte mensal (assumindo aporte no fim do mês, então rende no próximo)
    // Se o aporte for no início, somaria antes dos juros. Padrão calculadora: fim.
    currentTotal += monthlyValue;
    totalInvested += monthlyValue;

    // Grava snapshot a cada 12 meses (1 ano) ou no último mês
    if (m % 12 === 0 || m === totalMonths) {
      yearlyBreakdown.push({
        year: Math.ceil(m / 12),
        invested: totalInvested,
        interest: currentTotal - totalInvested,
        total: currentTotal
      });
    }
  }

  return {
    totalInvested,
    totalInterest: currentTotal - totalInvested,
    totalAmount: currentTotal,
    yearlyBreakdown
  };
}