import dayjs from 'dayjs';

export function convertEpochToDate(epoch: number) {
  return dayjs.unix(epoch);
}

export function convertDateToEpoch(date: Date) {
  return dayjs(date).unix();
}
