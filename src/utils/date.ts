import { differenceInCalendarWeeks, differenceInCalendarDays } from 'date-fns';

const dayNumberToName = (day: number): string => {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      throw new Error();
  }
};

export const formatDate = (date: Date): string => {
  const now = new Date();

  if (now.getUTCDate() === date.getUTCDate()) return 'Today';

  const daysFromNow = Math.abs(differenceInCalendarDays(now, date));
  if (daysFromNow === 1) return 'Tomorrow';
  if (daysFromNow < 7) return dayNumberToName(date.getUTCDay());

  return `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`;
};
