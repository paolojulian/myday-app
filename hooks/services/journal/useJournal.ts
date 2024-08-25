import { useQuery } from '@tanstack/react-query';
import { Journal, JournalQueryKeys } from './journal.types';
import { useSQLiteContext } from 'expo-sqlite';
import dayjs from 'dayjs';

export function useJournal(date: Date) {
  const db = useSQLiteContext();

  const getJournalByDate = async () => {
    const result = await db.getFirstAsync<Journal>(GET_JOURNAL_BY_DATE, {
      $start: dayjs(date).startOf('day').unix().toString(),
      $end: dayjs(date).endOf('day').unix().toString(),
    });

    return result;
  };

  return useQuery({
    queryKey: [JournalQueryKeys.journal, dayjs(date).format('YYYY-MM-DD')],
    queryFn: getJournalByDate,
  });
}

const GET_JOURNAL_BY_DATE = /* sql */ `
  SELECT journal.* FROM journal
  WHERE
    entry_date <= $end AND entry_date >= $start
  ORDER BY created_at DESC LIMIT 1
`;
