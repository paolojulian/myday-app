import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { Journal } from './journal.types';

const useUpdateOrCreateJournal = () => {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  async function setup(journal: Journal) {
    const now_epoch = convertDateToEpoch(new Date());
    return await db.runAsync(UPDATE_OR_CREATE_JOURNAL, {
      $title: journal.title,
      $description: journal.description,
      $createdAt: journal.created_at,
      $updatedAt: now_epoch,
    });
  }

  return useMutation({
    mutationFn: setup,
    onSuccess: response => {
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === 'journal';
        },
      });
      return response;
    },
  });
};

export default useUpdateOrCreateJournal;

// TODO revisit when we finalize structure
const UPDATE_OR_CREATE_JOURNAL = `
  INSERT INTO journal (title, description, created_at, updated_at)
  VALUES ($title, $description, $createdAt, $updatedAt);
`;
