import moment from 'moment';

export const getDateFromPeriod = (currentYear: number, currentMonth: number, currentPeriod: 'first' | 'second') =>
  moment().month(currentMonth).year(currentYear).date(currentPeriod === 'first' ? 2 : 17).toDate();
