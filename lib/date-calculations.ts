// Feriados Nacionais Fixos (Mês-Dia)
const NATIONAL_HOLIDAYS_FIXED: Record<string, string> = {
  "01-01": "Confraternização Universal",
  "04-21": "Tiradentes",
  "05-01": "Dia do Trabalhador",
  "09-07": "Independência do Brasil",
  "10-12": "Nossa Senhora Aparecida",
  "11-02": "Finados",
  "11-15": "Proclamação da República",
  "11-20": "Dia da Consciência Negra",
  "12-25": "Natal",
};

// Função auxiliar para formatar YYYY-MM-DD para chave MM-DD
const toMonthDayKey = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}-${day}`;
};

// Função para calcular a data da Páscoa (Método de Gauss) - Necessário para feriados móveis
const getEasterDate = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed (Março = 2, Abril = 3)
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month, day);
};

// Função para obter feriados móveis de um ano específico
const getMobileHolidays = (year: number): Record<string, string> = {
  const easter = getEasterDate(year);

  // Carnaval (Segunda e Terça) - 48 e 47 dias antes da Páscoa
  const carnaval1 = new Date(easter);
  carnaval1.setDate(easter.getDate() - 48);
  const carnaval2 = new Date(easter);
  carnaval2.setDate(easter.getDate() - 47);

  // Sexta-feira Santa - 2 dias antes da Páscoa
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);

  // Corpus Christi - 60 dias após a Páscoa
  const corpusChristi = new Date(easter);
  corpusChristi.setDate(easter.getDate() + 60);

  return {
    [toMonthDayKey(carnaval1)]: "Carnaval (Segunda)",
    [toMonthDayKey(carnaval2)]: "Carnaval (Terça)",
    [toMonthDayKey(goodFriday)]: "Sexta-feira Santa",
    [toMonthDayKey(corpusChristi)]: "Corpus Christi",
    // Nota: Páscoa cai sempre no domingo, então não precisa listar como feriado útil
  };
};

export interface ExcludedDayDetail {
  date: string; // Formato DD/MM/YYYY
  reason: string;
}

export interface WorkingDaysResult {
  totalWorkingDays: number;
  excludedDays: ExcludedDayDetail[];
}

// --- FUNÇÕES PRINCIPAIS EXPORTADAS ---

/**
 * Calcula o total de dias corridos entre duas datas, INCLUINDO a data final.
  */
export function calculateTotalDays(
  startDateStr: string,
  endDateStr: string
): number {
  if (!startDateStr || !endDateStr) return 0;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  // Zera as horas para evitar problemas de fuso horário na diferença
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (start > end) return 0;

  const oneDayMs = 1000 * 60 * 60 * 24;
  const differenceMs = end.getTime() - start.getTime();

  // Adiciona 1 para incluir o dia final no cálculo
  return Math.round(differenceMs / oneDayMs) + 1;
}

/**
 * Calcula dias úteis (Seg-Sex) excluindo feriados nacionais, INCLUINDO data final.
 * Retorna também o detalhamento dos dias excluídos.
 */
export function calculateWorkingDays(
  startDateStr: string,
  endDateStr: string
): WorkingDaysResult {
  if (!startDateStr || !endDateStr)
    return { totalWorkingDays: 0, excludedDays: [] };

  const start = new Date(startDateStr + "T00:00:00"); // Força timezone local
  const end = new Date(endDateStr + "T00:00:00");

  if (start > end) return { totalWorkingDays: 0, excludedDays: [] };

  let workingDays = 0;
  const excludedDays: ExcludedDayDetail[] = [];
  const currentDate = new Date(start);

  // Cache para feriados móveis por ano para evitar recálculo
  const mobileHolidaysCache: Record<number, Record<string, string>> = {};

  // Loop INCLUSIVO (<= end)
  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay(); // 0 = Domingo, 6 = Sábado
    const currentYear = currentDate.getFullYear();
    const monthDayKey = toMonthDayKey(currentDate);

    // Formata a data para exibição no relatório (DD/MM/AAAA)
    const formattedDate = currentDate.toLocaleDateString("pt-BR");

    let isHoliday = false;
    let holidayName = "";

    // 1. Verifica Fim de Semana
    if (dayOfWeek === 0) {
      excludedDays.push({ date: formattedDate, reason: "Domingo" });
      isHoliday = true;
    } else if (dayOfWeek === 6) {
      excludedDays.push({ date: formattedDate, reason: "Sábado" });
      isHoliday = true;
    }
    // 2. Se não for fim de semana, verifica Feriados Nacionais Fixos
    else if (NATIONAL_HOLIDAYS_FIXED[monthDayKey]) {
      holidayName = NATIONAL_HOLIDAYS_FIXED[monthDayKey];
      excludedDays.push({
        date: formattedDate,
        reason: `Feriado Nacional (${holidayName})`,
      });
      isHoliday = true;
    }
    // 3. Se não achou, verifica Feriados Móveis
    else {
      if (!mobileHolidaysCache[currentYear]) {
        mobileHolidaysCache[currentYear] = getMobileHolidays(currentYear);
      }
      const mobileHolidays = mobileHolidaysCache[currentYear];
      if (mobileHolidays[monthDayKey]) {
        holidayName = mobileHolidays[monthDayKey];
        excludedDays.push({
          date: formattedDate,
          reason: `Feriado Nacional Móvel (${holidayName})`,
        });
        isHoliday = true;
      }
    }

    // Se não foi excluído por nenhum motivo acima, é dia útil
    if (!isHoliday) {
      workingDays++;
    }

    // Avança para o próximo dia
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    totalWorkingDays: workingDays,
    excludedDays: excludedDays,
  };
}