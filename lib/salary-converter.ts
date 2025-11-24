export type SalaryPeriod = "hour" | "day" | "month" | "year";

export interface ConverterParams {
  amount: number;
  period: SalaryPeriod;
  weeklyHours?: number; // Opcional, padrão 44h (220h mensais)
}

export interface ConverterResult {
  hourly: number;
  daily: number;
  monthly: number;
  yearly: number;
}

export function convertSalary({
  amount,
  period,
  weeklyHours = 44,
}: ConverterParams): ConverterResult {
  // 1. Normalizar tudo para Salário Mensal (Base)
  // CLT Padrão: 44h semanais = 220h mensais
  const monthlyHours = (weeklyHours / 6) * 30; 
  
  // Fator de conversão Anual (Competência):
  // 12 Salários + 13º Salário + 1 Salário Férias + 1/3 Férias = 14.333...
  const annualFactor = 14 + (1/3);

  let monthlyBase = 0;

  switch (period) {
    case "hour":
      monthlyBase = amount * monthlyHours;
      break;
    case "day":
      monthlyBase = amount * 30; // Mês comercial
      break;
    case "month":
      monthlyBase = amount;
      break;
    case "year":
      // Se inseriu valor anual, descobre o mensal dividindo pelo fator completo
      monthlyBase = amount / annualFactor;
      break;
  }

  // 2. Distribuir para as outras unidades
  return {
    hourly: monthlyBase / monthlyHours,
    daily: monthlyBase / 30,
    monthly: monthlyBase,
    yearly: monthlyBase * annualFactor,
  };
}