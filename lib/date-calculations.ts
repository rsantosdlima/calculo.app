import Holidays from 'date-holidays';
export function calculateDateDiff(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validate
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return null;
  }

  // Difference in milliseconds
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Calculate Years, Months, Days breakdown
  // This is tricky because months have different lengths.
  // We will use a simple approach: iterate from start to end.

  let tempDate = new Date(start);
  let years = 0;
  let months = 0;
  let days = 0;

  // Ensure start < end for calculation logic
  const [d1, d2] = start < end ? [start, end] : [end, start];

  // Years
  while(true) {
     const nextYear = new Date(d1);
     nextYear.setFullYear(d1.getFullYear() + years + 1);
     if (nextYear > d2) break;
     years++;
  }

  // Months
  while(true) {
     const nextMonth = new Date(d1);
     nextMonth.setFullYear(d1.getFullYear() + years);
     nextMonth.setMonth(d1.getMonth() + months + 1);
     if (nextMonth > d2) break;
     months++;
  }

  // Remaining Days
  const current = new Date(d1);
  current.setFullYear(d1.getFullYear() + years);
  current.setMonth(d1.getMonth() + months);

  const diffTimeRemaining = Math.abs(d2.getTime() - current.getTime());
  days = Math.ceil(diffTimeRemaining / (1000 * 60 * 60 * 24));

  return {
    totalDays: diffDays,
    years,
    months,
    days
  };
}
/**
 * Calcula a quantidade de dias úteis entre duas datas (inclusive).
 * Utiliza a biblioteca 'date-holidays' para calcular feriados móveis e fixos do Brasil automaticamente.
 */
export function calculateWorkingDays(startDateStr: string, endDateStr: string): number {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    // Validações básicas se as datas são reais
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 0;
    }
    // Zera as horas para garantir que a comparação seja apenas pelo dia
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    
    if (start > end) {
         // Se data inicial for depois da final, retorna 0
         return 0; 
    }

    // 1. Inicializa a biblioteca de feriados carregando as regras do Brasil (BR)
    const hd = new Holidays('BR');

    // 2. Prepara uma lista rápida para guardar os feriados do período
    const holidaySet = new Set<string>();
    
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    // Busca os feriados de todos os anos envolvidos no intervalo selecionado pelo usuário
    for (let year = startYear; year <= endYear; year++) {
        // Pede pra biblioteca os feriados daquele ano
        const holidaysOfYear = hd.getHolidays(year);
        
        // Guarda cada data de feriado encontrada no formato AAAA-MM-DD
        holidaysOfYear.forEach(holiday => {
            // Ajuste técnico para garantir a data correta na string, independente do fuso horário
            const holidayDate = new Date(holiday.date);
            const yearStr = holidayDate.getFullYear();
            const monthStr = String(holidayDate.getMonth() + 1).padStart(2, '0');
            const dayStr = String(holidayDate.getDate()).padStart(2, '0');
            const formatted = `${yearStr}-${monthStr}-${dayStr}`;
            
            holidaySet.add(formatted);
        });
    }

    // 3. Loop de contagem dia a dia
    let workingDaysCount = 0;
    let currentDate = new Date(start);

    while (currentDate <= end) {
        // 0 = Domingo, 6 = Sábado
        const dayOfWeek = currentDate.getDay();
        
        // Formata a data atual do loop para AAAA-MM-DD para comparar com a lista de feriados
        const yearStr = currentDate.getFullYear();
        const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(currentDate.getDate()).padStart(2, '0');
        const currentDateStr = `${yearStr}-${monthStr}-${dayStr}`;

        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        // Verifica se a data atual está na nossa lista de feriados
        const isHoliday = holidaySet.has(currentDateStr);

        // Se NÃO for fim de semana E NÃO for feriado, conta como +1 dia útil
        if (!isWeekend && !isHoliday) {
            workingDaysCount++;
        }

        // Avança para o próximo dia no calendário
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return workingDaysCount;
}