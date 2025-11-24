// Tabela de Faixas do Seguro-Desemprego 2025 (Vigência 11/01/2025)
// Fonte: Ministério do Trabalho e Emprego (MTE)

const UNEMPLOYMENT_TABLE = [
  { limit: 2138.76, rate: 0.8, deduction: 0, fixedAdd: 0 },
  { 
    limit: 3564.96, 
    rate: 0.5, 
    deduction: 0, 
    fixedAdd: 1711.01 // (2138.76 * 0.8)
  },
  // Acima de 3564.96, paga o teto fixo (tratado na função)
];

const CEILING_VALUE = 2424.11; // Novo Teto 2025
const MIN_WAGE = 1518.00; // Piso (Salário Mínimo 2025)

export interface UnemploymentParams {
  salary1: number; // Penúltimo salário
  salary2: number; // Antepenúltimo salário
  salary3: number; // Último salário
  monthsWorked: number; // Meses trabalhados nos últimos 36 meses
  timesRequested: number; // Quantas vezes já solicitou (0 = primeira vez)
}

export interface UnemploymentResult {
  averageSalary: number;
  installmentValue: number;
  installmentCount: number;
  totalBenefit: number;
  isEligible: boolean;
  ineligibilityReason?: string;
}

export function calculateUnemployment(params: UnemploymentParams): UnemploymentResult {
  const { salary1, salary2, salary3, monthsWorked, timesRequested } = params;

  // 1. Calcula Média dos 3 últimos salários
  let sum = 0;
  let count = 0;
  if (salary1 > 0) { sum += salary1; count++; }
  if (salary2 > 0) { sum += salary2; count++; }
  if (salary3 > 0) { sum += salary3; count++; }
  
  const averageSalary = count > 0 ? sum / count : 0;

  // 2. Verifica Elegibilidade e Quantidade de Parcelas
  let isEligible = false;
  let installmentCount = 0;
  let reason = "";

  if (timesRequested === 0) {
    // 1ª Solicitação: 12 meses nos últimos 18
    if (monthsWorked >= 12) {
      isEligible = true;
      if (monthsWorked >= 12 && monthsWorked <= 23) installmentCount = 4;
      else if (monthsWorked >= 24) installmentCount = 5;
    } else {
      reason = "Para a 1ª solicitação, é necessário ter trabalhado pelo menos 12 meses.";
    }
  } else if (timesRequested === 1) {
    // 2ª Solicitação: 9 meses nos últimos 12
    if (monthsWorked >= 9) {
      isEligible = true;
      if (monthsWorked >= 9 && monthsWorked <= 11) installmentCount = 3;
      else if (monthsWorked >= 12 && monthsWorked <= 23) installmentCount = 4;
      else if (monthsWorked >= 24) installmentCount = 5;
    } else {
      reason = "Para a 2ª solicitação, é necessário ter trabalhado pelo menos 9 meses.";
    }
  } else {
    // 3ª ou mais: 6 meses anteriores
    if (monthsWorked >= 6) {
      isEligible = true;
      if (monthsWorked >= 6 && monthsWorked <= 11) installmentCount = 3;
      else if (monthsWorked >= 12 && monthsWorked <= 23) installmentCount = 4;
      else if (monthsWorked >= 24) installmentCount = 5;
    } else {
      reason = "Para a 3ª solicitação em diante, é necessário ter trabalhado pelo menos 6 meses.";
    }
  }

  if (!isEligible) {
    return {
      averageSalary,
      installmentValue: 0,
      installmentCount: 0,
      totalBenefit: 0,
      isEligible: false,
      ineligibilityReason: reason
    };
  }

  // 3. Calcula Valor da Parcela (Tabela 2025)
  let installmentValue = 0;

  if (averageSalary <= UNEMPLOYMENT_TABLE[0].limit) {
    installmentValue = averageSalary * UNEMPLOYMENT_TABLE[0].rate;
  } else if (averageSalary <= UNEMPLOYMENT_TABLE[1].limit) {
    const excess = averageSalary - UNEMPLOYMENT_TABLE[0].limit;
    installmentValue = UNEMPLOYMENT_TABLE[1].fixedAdd + (excess * UNEMPLOYMENT_TABLE[1].rate);
  } else {
    installmentValue = CEILING_VALUE;
  }

  // Aplica o Piso
  if (installmentValue < MIN_WAGE) {
    installmentValue = MIN_WAGE;
  }

  return {
    averageSalary,
    installmentValue,
    installmentCount,
    totalBenefit: installmentValue * installmentCount,
    isEligible: true
  };
}