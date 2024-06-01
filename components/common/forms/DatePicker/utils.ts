import dayjs from 'dayjs';

/**
 * Returns a 2D array of calendar days for a given year and month.
 * Each element in the array represents a week, and each week contains objects representing individual days.
 * The objects contain the date and a flag indicating whether the day belongs to the current month.
 *
 * @param year - The year of the calendar.
 * @param month - The month of the calendar (1-12).
 * @returns A 2D array of calendar days.
 */
export function getCalendarDays(
  year: number,
  month: number,
): { date: Date; isCurrentMonth: boolean }[][] {
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const weeksArray = [];
  let week = [];

  // Add previous month days
  const previousMonth = month === 1 ? 12 : month - 1;
  const previousMonthYear = month === 1 ? year - 1 : year;
  const daysInPreviousMonth = new Date(previousMonthYear, previousMonth, 0).getDate();
  const startDay = daysInPreviousMonth - firstDayOfMonth + 1;
  for (let i = startDay; i <= daysInPreviousMonth; i++) {
    week.push({ date: new Date(previousMonthYear, previousMonth - 1, i), isCurrentMonth: false });
    if (week.length === 7) {
      weeksArray.push(week);
      week = [];
    }
  }

  // Add current month days
  for (let i = 1; i <= daysInMonth; i++) {
    week.push({ date: new Date(year, month - 1, i), isCurrentMonth: true });
    if (week.length === 7) {
      weeksArray.push(week);
      week = [];
    }
  }

  // Add next month days
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextMonthYear = month === 12 ? year + 1 : year;
  const remainingDays = 7 - (week.length % 7);
  for (let i = 1; i <= remainingDays; i++) {
    week.push({ date: new Date(nextMonthYear, nextMonth - 1, i), isCurrentMonth: false });
  }
  if (week.length > 0) {
    weeksArray.push(week);
  }

  return weeksArray;
}

export function isToday(date: Date) {
  return dayjs().isSame(date, 'day');
}

export function getCalendarTitle(date?: Date) {
  if (!date) {
    return 'Select a date';
  }

  if (date && isToday(date)) {
    const formattedDateToday = dayjs(date).format('MMM D,YYYY');
    return `Today, ${formattedDateToday}`;
  }

  const tomorrow = dayjs().add(1, 'day');
  if (date && dayjs(date).isSame(tomorrow, 'day')) {
    const formattedDateTomorrow = dayjs(date).format('MMM D,YYYY');
    return `Tomorrow, ${formattedDateTomorrow}`;
  }

  const valueDayJS = dayjs(date);
  return valueDayJS.format('ddd, MMM D, YYYY');
}
