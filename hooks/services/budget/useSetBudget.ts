import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';

const useSetBudget = () => {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  async function setup(amount: number) {
    const now_epoch = convertDateToEpoch(new Date());
    return await db.runAsync(INSERT_LATEST_BUDGET, {
      $amount: String(amount),
      $created_at: now_epoch,
    });
  }

  return useMutation({
    mutationFn: setup,
    onSuccess: response => {
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === 'budget';
        },
      });
      return response;
    },
  });
};

export default useSetBudget;

const INSERT_LATEST_BUDGET = `
  INSERT INTO budget (amount, created_at)
  VALUES ($amount, $created_at)
`;
