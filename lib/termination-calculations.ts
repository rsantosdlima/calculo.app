import {
  INSS_TABLE,
  IRRF_TABLE,
  INSS_CEILING,
  IRRF_SIMPLIFIED_DISCOUNT,
  DEPENDENT_DEDUCTION
} from "./tax-tables";

export type TerminationReason = 
  | "sem_justa_causa" 
  | "pedido_demissao" 
  | "justa_causa" 
  | "acordo_mutuo"
  | "termino_contrato"; 

export type NoticeType = 
  | "trabalhado" 
  | "indenizado_empregador" // Empresa paga
  | "indenizado_empregado"  // Descontado do funcionário
  | "dispensado"            // Empresa dispensa cumprimento (não paga nem desconta)
  | "nao_aplicavel";

export interface TerminationParams {
  startDate: string;
  endDate: string;
  grossSalary: number;
  dependents: number;
  reason: TerminationReason;
  noticeType: NoticeType;
  noticeDaysNotWorked: number; // NOVO: Dias a descontar se não cumpriu tudo
  fgtsBalance: number; 
  vacationDueDays: number; // NOVO: Quantidade de dias vencidos (ex: 15, 20, 30)
}

export interface TerminationResult {
  // Verbas
  salaryBalance: number;
  noticeAmount: number;
  vacationProportional: number;
  vacationExpired: number;
  vacationOneThird: number;
  thirteenthProportional: number;
  fgtsFine: number;

  // Descontos
  inssSalary: number;
  inss13th: number;
  irrfSalary: number;
  irrf13th: number;
  noticeCost: number; // Valor do desconto do aviso
  
  // Totais
  totalEarnings: number;
  totalDiscounts: number;
  totalNet: number;
  
  // Meta
  daysWorkedBalance: number;
  months13th: number;
  monthsVacation: number;
  noticeDays: number; // Dias de direito (para indenização)
}

// --- Helpers ---

const calculateINSS = (base: number): number => {
  if (base <= 0) return 0;
  if (base > INSS_CEILING) {
    const last = INSS_TABLE[INSS_TABLE.length - 1];
    return last.limit * last.rate - last.deduction;
  }
  for (const faixa of INSS_TABLE) {
    if (base <= faixa.limit) {
      return base * faixa.rate - faixa.deduction;
    }
  }
  const last = INSS_TABLE[INSS_TABLE.length - 1];
  return base * last.rate - last.deduction;
};

const calculateIRRF = (base: number): number => {
  if (base <= 0) return 0;
  for (const faixa of IRRF_TABLE) {
    if (faixa.limit === null || base <= faixa.limit) {
      return base * faixa.rate - faixa.deduction;
    }
  }
  return 0;
};

// --- Main Calculation ---

export function calculateTermination(params: TerminationParams): TerminationResult {
  const start = new Date(params.startDate + "T00:00:00");
  const end = new Date(params.endDate + "T00:00:00");
  const { grossSalary, reason, noticeType, noticeDaysNotWorked, dependents, fgtsBalance, vacationDueDays } = params;

  // 1. Saldo de Salário
  const daysWorkedBalance = Math.min(30, end.getDate());
  const salaryBalance = (grossSalary / 30) * daysWorkedBalance;

  // 2. Aviso Prévio (Lógica Refinada)
  const yearsWorked = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  
  let noticeDaysRight = 0; // Dias de direito (para indenização da empresa)
  let noticeAmount = 0;    // Valor a receber
  let noticeCost = 0;      // Valor a pagar (desconto)

  // Regra de dias de direito (Lei 12.506)
  if (reason === "sem_justa_causa" || reason === "acordo_mutuo") {
    noticeDaysRight = 30 + (Math.min(20, yearsWorked) * 3);
  } else if (reason === "pedido_demissao") {
    noticeDaysRight = 30; // Base para cálculo do desconto apenas
  }

  // Lógica Financeira do Aviso
  if (noticeType === "indenizado_empregador") {
    // Empresa paga
    const factor = (reason === "acordo_mutuo") ? 0.5 : 1;
    noticeAmount = ((grossSalary / 30) * noticeDaysRight) * factor;
  
  } else if (noticeType === "indenizado_empregado") {
    // Empregado paga (desconto)
    // Pode ser total (30 dias) ou parcial (dias não cumpridos)
    const daysToDiscount = Math.min(30, Math.max(0, noticeDaysNotWorked));
    noticeCost = (grossSalary / 30) * daysToDiscount;
  
  } else if (noticeType === "dispensado") {
    // Empresa dispensou cumprimento: 0 paga, 0 recebe.
    noticeAmount = 0;
    noticeCost = 0;
  }
  // "trabalhado" = 0 extras (já está no saldo de salário ou projetado na data)

  // Projeção do Aviso (para avos) - Só existe se a empresa indeniza
  const dateWithNoticeProjection = new Date(end);
  if (noticeType === "indenizado_empregador") {
    dateWithNoticeProjection.setDate(end.getDate() + noticeDaysRight);
  }

  // 3. 13º Salário Proporcional
  const currentYearStart = new Date(dateWithNoticeProjection.getFullYear(), 0, 1);
  const calculationStart13th = start > currentYearStart ? start : currentYearStart;
  
  let months13th = 0;
  let cursor = new Date(calculationStart13th);
  cursor.setDate(1);
  
  while (cursor <= dateWithNoticeProjection) {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    
    let daysWorkedInMonth = lastDayOfMonth;
    if (year === calculationStart13th.getFullYear() && month === calculationStart13th.getMonth()) {
      daysWorkedInMonth = lastDayOfMonth - calculationStart13th.getDate() + 1;
    }
    if (year === dateWithNoticeProjection.getFullYear() && month === dateWithNoticeProjection.getMonth()) {
      daysWorkedInMonth = dateWithNoticeProjection.getDate();
    }

    if (daysWorkedInMonth >= 15) months13th++;
    cursor.setMonth(cursor.getMonth() + 1);
    cursor.setDate(1);
  }
  
  if (reason === "justa_causa") months13th = 0;
  const thirteenthProportional = (grossSalary / 12) * Math.min(12, months13th);

  // 4. Férias
  // Férias Vencidas (Valor exato baseado nos dias informados)
  const vacationExpiredValue = (grossSalary / 30) * vacationDueDays;

  // Férias Proporcionais
  let monthsVacation = 0;
  // Acha o último aniversário
  const anniversaryThisYear = new Date(dateWithNoticeProjection.getFullYear(), start.getMonth(), start.getDate());
  let lastAnniversary = anniversaryThisYear;
  if (anniversaryThisYear > dateWithNoticeProjection) {
    lastAnniversary = new Date(dateWithNoticeProjection.getFullYear() - 1, start.getMonth(), start.getDate());
  }
  if (start > lastAnniversary) lastAnniversary = start;

  // Cálculo aproximado robusto de avos de férias
  let diffTime = Math.abs(dateWithNoticeProjection.getTime() - lastAnniversary.getTime());
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  monthsVacation = Math.floor(diffDays / 30); 
  const remainderDays = diffDays % 30;
  if (remainderDays >= 15) monthsVacation++;
  monthsVacation = Math.min(12, monthsVacation);

  if (reason === "justa_causa") monthsVacation = 0;

  const vacationProportionalValue = (grossSalary / 12) * monthsVacation;
  
  // 1/3 Constitucional (Sobre vencidas + proporcionais)
  const vacationTotalBase = vacationExpiredValue + vacationProportionalValue;
  const vacationOneThird = vacationTotalBase / 3;

  // 5. Multa FGTS
  let fgtsFine = 0;
  if (reason === "sem_justa_causa") {
    fgtsFine = fgtsBalance * 0.40;
  } else if (reason === "acordo_mutuo") {
    fgtsFine = fgtsBalance * 0.20;
  }

  // --- TRIBUTAÇÃO ---

  const inssSalary = calculateINSS(salaryBalance); // Aviso indenizado não incide INSS (regra geral atual)
  const inss13th = calculateINSS(thirteenthProportional);

  const irrfBaseSalaryLegal = salaryBalance - inssSalary - (dependents * DEPENDENT_DEDUCTION);
  const irrfBaseSalarySimpl = salaryBalance - IRRF_SIMPLIFIED_DISCOUNT;
  const irrfSalary = Math.min(
    calculateIRRF(Math.max(0, irrfBaseSalaryLegal)),
    calculateIRRF(Math.max(0, irrfBaseSalarySimpl))
  );

  const irrfBase13thLegal = thirteenthProportional - inss13th - (dependents * DEPENDENT_DEDUCTION);
  const irrfBase13thSimpl = thirteenthProportional - IRRF_SIMPLIFIED_DISCOUNT;
  const irrf13th = Math.min(
    calculateIRRF(Math.max(0, irrfBase13thLegal)),
    calculateIRRF(Math.max(0, irrfBase13thSimpl))
  );

  const totalEarnings = salaryBalance + noticeAmount + vacationTotalBase + vacationOneThird + thirteenthProportional + fgtsFine;
  const totalDiscounts = inssSalary + inss13th + irrfSalary + irrf13th + noticeCost;
  
  return {
    salaryBalance,
    noticeAmount,
    vacationProportional: vacationProportionalValue,
    vacationExpired: vacationExpiredValue,
    vacationOneThird,
    thirteenthProportional,
    fgtsFine,
    inssSalary,
    inss13th,
    irrfSalary,
    irrf13th,
    noticeCost,
    totalEarnings,
    totalDiscounts,
    totalNet: totalEarnings - totalDiscounts,
    daysWorkedBalance,
    months13th,
    monthsVacation,
    noticeDays: noticeDaysRight
  };
}