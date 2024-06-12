import dayjs from 'dayjs';

export function convertEpochToDate(epoch: number) {
  return dayjs.unix(epoch);
}
