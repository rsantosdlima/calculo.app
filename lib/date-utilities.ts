export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthday: string; // Dia da semana do próximo
  daysToBirthday: number;
}

export interface DateOperationResult {
  initialDate: string;
  operator: "add" | "subtract";
  amount: number;
  type: "days" | "weeks" | "months" | "years";
  resultDate: string; // YYYY-MM-DD
  resultDateFormatted: string; // DD/MM/AAAA
  isBusinessDay: boolean;
  dayOfWeek: string;
}

// --- Calculadora de Idade ---
export function calculateAge(birthDateStr: string): AgeResult {
  const birthDate = new Date(birthDateStr + "T00:00:00");
  const today = new Date();
  // Zera horas de hoje para comparação justa
  today.setHours(0, 0, 0, 0);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Ajuste de meses/anos se o aniversário ainda não chegou
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  // Ajuste de dias se o dia atual é menor que o dia do nascimento
  if (days < 0) {
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
  }

  // Dias totais vividos
  const diffTime = Math.abs(today.getTime() - birthDate.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Próximo aniversário
  const nextBirthdayDate = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthdayDate < today) {
    nextBirthdayDate.setFullYear(today.getFullYear() + 1);
  }
  
  const daysToBirthday = Math.ceil((nextBirthdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  return {
    years,
    months,
    days,
    totalDays,
    nextBirthday: weekDays[nextBirthdayDate.getDay()],
    daysToBirthday
  };
}

// --- Calculadora de Somar/Subtrair Datas ---
export function calculateDateOperation(
  dateStr: string, 
  amount: number, 
  operation: "add" | "subtract",
  type: "days" | "weeks" | "months" | "years"
): DateOperationResult {
  const baseDate = new Date(dateStr + "T00:00:00");
  const resultDate = new Date(baseDate);
  
  const multiplier = operation === "add" ? 1 : -1;

  switch (type) {
    case "days":
      resultDate.setDate(baseDate.getDate() + (amount * multiplier));
      break;
    case "weeks":
      resultDate.setDate(baseDate.getDate() + (amount * 7 * multiplier));
      break;
    case "months":
      resultDate.setMonth(baseDate.getMonth() + (amount * multiplier));
      break;
    case "years":
      resultDate.setFullYear(baseDate.getFullYear() + (amount * multiplier));
      break;
  }

  const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const dayOfWeek = weekDays[resultDate.getDay()];
  
  // Verifica se é dia útil (Seg-Sex) - Simplificado (não checa feriados aqui, só fim de semana)
  const isBusinessDay = resultDate.getDay() !== 0 && resultDate.getDay() !== 6;

  // Formatação
  const y = resultDate.getFullYear();
  const m = (resultDate.getMonth() + 1).toString().padStart(2, "0");
  const d = resultDate.getDate().toString().padStart(2, "0");

  return {
    initialDate: dateStr,
    operator: operation,
    amount,
    type,
    resultDate: `${y}-${m}-${d}`,
    resultDateFormatted: `${d}/${m}/${y}`,
    isBusinessDay,
    dayOfWeek
  };
}