export interface TimeEntry {
  id: string;
  value: string; // Formato "HH:MM"
  operation: "add" | "subtract";
}

export interface TimeResult {
  totalHours: number;
  totalMinutes: number;
  formatted: string; // "HH:MM"
  isNegative: boolean;
  decimal: number; // Para multiplicar por valor hora (ex: 10.5 para 10h30)
}

export function calculateTimeSum(entries: TimeEntry[]): TimeResult {
  let totalMinutes = 0;

  entries.forEach((entry) => {
    if (!entry.value) return;

    const [hoursStr, minutesStr] = entry.value.split(":");
    const h = parseInt(hoursStr) || 0;
    const m = parseInt(minutesStr) || 0;

    const absoluteMinutes = (h * 60) + m;

    if (entry.operation === "add") {
      totalMinutes += absoluteMinutes;
    } else {
      totalMinutes -= absoluteMinutes;
    }
  });

  const isNegative = totalMinutes < 0;
  const absoluteTotal = Math.abs(totalMinutes);

  const hours = Math.floor(absoluteTotal / 60);
  const minutes = absoluteTotal % 60;

  // Formatação com zero à esquerda
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  
  const sign = isNegative ? "-" : "";
  const formatted = `${sign}${formattedHours}:${formattedMinutes}`;

  // Decimal (ex: 1h30 = 1.5)
  const decimal = totalMinutes / 60;

  return {
    totalHours: hours,
    totalMinutes: minutes,
    formatted,
    isNegative,
    decimal
  };
}