import {
  buildListByFilter,
  getCategoriesFromExpenses,
} from '@/components/expenses/ExpensesList/ExpensesList.utils';
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

describe('TESTING buildListByFilter', () => {
  describe('WHEN expenses is undefined', () => {
    it('THEN it should return an empty array', () => {
      const result = buildListByFilter({ expenses: undefined, selectedFilter: 'item' });
      expect(result).toStrictEqual([]);
    });
  });

  describe('WHEN selectedFilter is item', () => {
    it('THEN it should not modify the expenses', () => {
      const expenses: ExpenseWithCategoryName[] = [
        { id: 1, category_id: 1, category_name: 'Food', amount: 10 },
      ] as ExpenseWithCategoryName[];

      const result = buildListByFilter({
        expenses,
        selectedFilter: 'item',
      });

      expect(result).toStrictEqual(expenses);
    });
  });

  describe('WHEN selectedFilter is category', () => {
    it('THEN it should group expenses by category', () => {
      const expenses = [
        {
          id: 1,
          category_id: 1,
          category_name: 'Food',
          amount: 10,
        },
        {
          id: 2,
          category_id: 1,
          category_name: 'Food',
          amount: 20,
        },
        {
          id: 3,
          category_id: 2,
          category_name: 'Transportation',
          amount: 30,
        },
      ] as ExpenseWithCategoryName[];

      const result = buildListByFilter({
        expenses,
        selectedFilter: 'category',
      });

      expect(result).toEqual([
        {
          type: 'category',
          categoryId: 1,
          categoryName: 'Food',
          totalAmount: 30,
        },
        {
          type: 'category',
          categoryId: 2,
          categoryName: 'Transportation',
          totalAmount: 30,
        },
      ]);
    });
  });
});
