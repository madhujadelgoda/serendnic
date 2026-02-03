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

  for (let month = 0; month < 12; month++) {
    const daysInMonth = daysInMonths[month];

    if (remaining <= daysInMonth) {
      const mm = String(month + 1).padStart(2, "0");
      const dd = String(remaining).padStart(2, "0");

      return `${year}-${mm}-${dd}`;
    }

    remaining -= daysInMonth;
  }

  // If we get here, the day-of-year was invalid
  throw new Error(`Invalid day-of-year: ${day}`);
}
