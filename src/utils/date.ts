export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function dayOfYearToDate(year: number, day: number): string {
  const daysInMonths = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];

  let remaining = day;
  let month = 0;

  while (month < 12 && remaining > daysInMonths[month]) {
    remaining -= daysInMonths[month];
    month++;
  }

  const mm = String(month + 1).padStart(2, "0");
  const dd = String(remaining).padStart(2, "0");

  return `${year}-${mm}-${dd}`;
}
