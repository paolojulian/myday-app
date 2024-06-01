/**
 * Returns an array of calendar days for the specified year and month.
 * Each day object contains the day number and a flag indicating whether it belongs to the current month.
 *
 * @param year - The year of the calendar.
 * @param month - The month of the calendar (1-12).
 * @returns An array of day objects.
 */
export function getCalendarDays(
  year: number,
  month: number,
): { day: number; isCurrentMonth: boolean }[] {
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = [];

  // Add previous month days
  const previousMonth = month === 1 ? 12 : month - 1;
  const previousMonthYear = month === 1 ? year - 1 : year;
  const daysInPreviousMonth = new Date(previousMonthYear, previousMonth, 0).getDate();
  const startDay = daysInPreviousMonth - firstDayOfMonth + 1;
  for (let i = startDay; i <= daysInPreviousMonth; i++) {
    daysArray.push({ day: i, isCurrentMonth: false });
  }

  // Add current month days
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({ day: i, isCurrentMonth: true });
  }

  // Add next month days
  const remainingDays = 7 - (daysArray.length % 7);
  for (let i = 1; i <= remainingDays; i++) {
    daysArray.push({ day: i, isCurrentMonth: false });
  }

  return daysArray;
}
