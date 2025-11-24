export interface FinancingParams {
  loanAmount: number;
  annualRate: number;
  totalMonths: number;
  system: "SAC" | "PRICE";
}

export interface FinancingResult {
  monthlyRate: number;
  firstInstallment: number;
  lastInstallment: number;
  totalPaid: number;
  totalInterest: number;
  totalAmortization: number;
  installments: Array<{
    number: number;
    interest: number;
    amortization: number;
    payment: number;
    balance: number;
  }>;
}

export function calculateFinancing({
  loanAmount,
  annualRate,
  totalMonths,
  system,
}: FinancingParams): FinancingResult {
  // Conversão de taxa anual para mensal
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  
  let balance = loanAmount;
  let totalPaid = 0;
  let totalInterest = 0;
  let totalAmortization = 0;
  const installments = [];

  // SISTEMA SAC (Amortização Constante - Parcelas Decrescentes)
  if (system === "SAC") {
    const constantAmortization = loanAmount / totalMonths;

    for (let i = 1; i <= totalMonths; i++) {
      const interest = balance * monthlyRate;
      const payment = constantAmortization + interest;
      
      balance -= constantAmortization;
      // Correção para zerar saldo residual por arredondamento
      if (balance < 0.01) balance = 0;

      totalPaid += payment;
      totalInterest += interest;
      totalAmortization += constantAmortization;

      installments.push({
        number: i,
        interest,
        amortization: constantAmortization,
        payment,
        balance,
      });
    }
  } 
  // SISTEMA PRICE (Parcelas Fixas)
  else {
    // Fórmula PMT = PV * [ i(1+i)^n ] / [ (1+i)^n - 1 ]
    const pmt = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

    for (let i = 1; i <= totalMonths; i++) {
      const interest = balance * monthlyRate;
      const amortization = pmt - interest;
      
      balance -= amortization;
      if (balance < 0.01) balance = 0;

      totalPaid += pmt;
      totalInterest += interest;
      totalAmortization += amortization;

      installments.push({
        number: i,
        interest,
        amortization,
        payment: pmt,
        balance,
      });
    }
  }

  return {
    monthlyRate: monthlyRate * 100,
    firstInstallment: installments[0].payment,
    lastInstallment: installments[installments.length - 1].payment,
    totalPaid,
    totalInterest,
    totalAmortization,
    installments,
  };
}