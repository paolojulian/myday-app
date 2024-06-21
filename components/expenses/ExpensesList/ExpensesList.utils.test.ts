import { getCategoriesFromExpenses } from '@/components/expenses/ExpensesList/ExpensesList.utils';
import { ExpenseWithCategoryName } from '@/hooks/services/expense/expense.types';

describe('TESTING getCategoriesFromExpenses', () => {
  describe('WHEN expenses is undefined', () => {
    it('THEN should return an empty array', () => {
      const result = getCategoriesFromExpenses(undefined);
      expect(result).toStrictEqual([]);
    });
  });

  describe('WHEN expenses is an empty array', () => {
    it('THEN should return an empty array', () => {
      const result = getCategoriesFromExpenses([]);
      expect(result).toStrictEqual([]);
    });
  });

  describe('WHEN expenses is not empty', () => {
    it('THEN should return an array of unique categories', () => {
      const expenses = [
        { category_id: 1, category_name: 'Food' },
        { category_id: 2, category_name: 'Transportation' },
        { category_id: 1, category_name: 'Food' },
        { category_id: 3, category_name: 'Entertainment' },
        { category_id: 3, category_name: 'Entertainment' },
        { category_id: 3, category_name: 'Entertainment' },
        { category_id: 3, category_name: 'Entertainment' },
        { category_id: 3, category_name: 'Entertainment' },
      ] as ExpenseWithCategoryName[];
      const result = getCategoriesFromExpenses(expenses);
      expect(result).toEqual([
        { category_id: 1, category_name: 'Food' },
        { category_id: 2, category_name: 'Transportation' },
        { category_id: 3, category_name: 'Entertainment' },
      ]);
    });
  });
});
