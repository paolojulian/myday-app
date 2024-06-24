import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useMutation } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';

const useSetBudget = (amount: number) => {
  const db = useSQLiteContext();

  async function setup() {
    const now_epoch = convertDateToEpoch(new Date());
    return await db.runAsync(INSERT_LATEST_BUDGET, {
      $amount: amount,
      $created_at: now_epoch,
    });
  }

  return useMutation({
    mutationFn: setup,
  });
};

export default useSetBudget;

const INSERT_LATEST_BUDGET = `
  INSERT INTO budget (amount, created_at)
  VALUES ($amount, $created_at)
`;
