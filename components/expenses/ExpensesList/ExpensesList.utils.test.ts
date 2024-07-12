import {
  buildCategoryList,
  getCategoriesFromExpenses,
} from '@/components/expenses/ExpensesList/ExpensesList.utils';
import { ExpenseWithCategoryName } from '@/hooks/services/expense/expense.types';
import { mockExpensesWithCategoryName } from '@/utils/testUtils/mockExpenses';

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

describe('TESTING buildCategoryList', () => {
  describe('GIVEN expenses with categories but some does not have', () => {
    const expenses = mockExpensesWithCategoryName;
    describe('WHEN buildCategoryList is called', () => {
      it('THEN it should return a list of categories along with percent', () => {
        const result = buildCategoryList(expenses);
        expect(result).toEqual([
          {
            categoryId: 1,
            categoryName: 'Food',
            totalAmount: 62,
          },
          {
            categoryId: 2,
            categoryName: 'Transportation',
            totalAmount: 22.5,
          },
          {
            categoryId: 3,
            categoryName: 'Entertainment',
            totalAmount: 15,
          },
          {
            categoryId: null,
            categoryName: 'Uncategorized',
            totalAmount: 30,
          },
        ]);
      });
    });
  });
});
