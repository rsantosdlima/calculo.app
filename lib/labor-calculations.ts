export interface OvertimeResult {
  normalHourlyRate: number;
  overtimeHourlyRate: number;
  totalOvertimeValue: number;
  dsrValue: number;
  grandTotal: number;
}

export interface CommissionDSRResult {
  baseSalary: number;
  commissionValue: number;
  businessDays: number;
  nonBusinessDays: number;
  dsrValue: number;
  totalValue: number;
}

/**
 * Calcula o valor das horas extras e o reflexo no DSR (Descanso Semanal Remunerado).
 *
 * Fórmula do DSR: (Valor total das horas extras / Dias úteis no mês) * Dias não úteis (domingos e feriados)
 */
export function calculateOvertime(
  grossSalary: number,
  monthlyHours: number,
  overtimePercentage: number,
  hoursWorked: number,
  includeDSR: boolean,
  businessDays: number, // Dias úteis (seg-sáb)
  nonBusinessDays: number // Domingos e feriados
): OvertimeResult {
  // 1. Valor da hora normal
  const normalHourlyRate = grossSalary / monthlyHours;

  // 2. Valor da hora extra com o adicional
  // Ex: 50% de adicional = hora normal * 1.5
  const multiplier = 1 + overtimePercentage / 100;
  const overtimeHourlyRate = normalHourlyRate * multiplier;

  // 3. Valor total das horas extras sem DSR
  const totalOvertimeValue = overtimeHourlyRate * hoursWorked;

  // 4. Cálculo do DSR (Reflexo)
  let dsrValue = 0;
  if (includeDSR && businessDays > 0 && nonBusinessDays > 0) {
    // Fórmula exata: (Valor HE / Dias Úteis) * Dias Não Úteis
    dsrValue = (totalOvertimeValue / businessDays) * nonBusinessDays;
  }

  // 5. Total geral bruto
  const grandTotal = totalOvertimeValue + dsrValue;

  return {
    normalHourlyRate,
    overtimeHourlyRate,
    totalOvertimeValue,
    dsrValue,
    grandTotal,
  };
}

/**
 * Calcula o DSR sobre Comissões.
 * A lógica é idêntica ao reflexo de HE: (Comissões / Dias Úteis) * Dias de Descanso.
 * Sábado é considerado dia útil para este cálculo, salvo acordo coletivo em contrário.
 */
export function calculateCommissionDSR(
  commissionValue: number,
  businessDays: number,
  nonBusinessDays: number,
  baseSalary: number = 0 // Novo parâmetro com valor padrão 0
): CommissionDSRResult {
  let dsrValue = 0;

  if (commissionValue > 0 && businessDays > 0 && nonBusinessDays > 0) {
    dsrValue = (commissionValue / businessDays) * nonBusinessDays;
  }

  return {
    baseSalary,
    commissionValue,
    businessDays,
    nonBusinessDays,
    dsrValue,
    totalValue: baseSalary + commissionValue + dsrValue,
  };
}