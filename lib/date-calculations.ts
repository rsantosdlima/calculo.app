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
