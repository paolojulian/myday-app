import AddExpenseForm from '@/components/add/AddExpenseForm/AddExpenseForm';
import { ADD_EXPENSE_FORM_TEST_IDS } from '@/components/add/AddExpenseForm/AddExpenseForm.utils';
import SnackbarManager, { SNACKBAR_TEST_IDS } from '@/managers/SnackbarManager';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import * as UseGetOrCreateCategory from '@/hooks/services/category/useGetOrCreateCategory';
import * as UseCreateExpense from '@/hooks/services/expense/useCreateExpenses';

jest.mock('@/hooks/services/expense/useCreateExpenses', () => {
  return {
    useCreateExpense: jest.fn(() => ({
      mutate: jest.fn(),
    })),
  };
});

jest.mock('@/hooks/services/category/useGetOrCreateCategory', () => {
  return {
    useGetOrCreateCategory: jest.fn(() => jest.fn()),
  };
});

describe('TESTING AddExpenseForm', () => {
  describe('WHEN AddExpenseForm is rendered', () => {
    it('THEN it should render correctly', () => {
      initialize();
      expect(screen).toBeTruthy();
    });
  });

  describe('WHEN the fields are filled correctly and submit button is clicked', () => {
    it('THEN it should submit the form', () => {
      jest
        .spyOn(UseGetOrCreateCategory, 'useGetOrCreateCategory')
        .mockImplementation(() => jest.fn(() => Promise.resolve(1)));

      const spyMutate = jest.fn();
      jest.spyOn(UseCreateExpense, 'useCreateExpense').mockImplementation(() => ({
        data: undefined,
        error: undefined,
        isLoading: false,
        mutate: spyMutate,
      }));

      initialize();
      const title = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.title);
      const category = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.category);
      const amount = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.amount);
      const description = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.description);
      const submitBtn = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.saveButton);

      act(() => {
        fireEvent.changeText(title, 'Groceries');
        fireEvent.changeText(category, 'Groceries');
        fireEvent.changeText(amount, '3000');
        fireEvent.changeText(description, 'SM Baguio');
        fireEvent.press(submitBtn);
      });

      // Expect the mutation to be called
      expect(spyMutate).toHaveBeenCalled();

      // Expect the form to be reset
      expect(title.props.value).toBe('');
      expect(category.props.value).toBe('');
      expect(amount.props.value).toBe('');
      expect(description.props.value).toBe('');

      // Expect the success snackbar to show
      const snackbar = screen.getByTestId(SNACKBAR_TEST_IDS.container);
      expect(snackbar).toBeTruthy();
    });
  });

  describe('WHEN the fields are not filled correctly and submit button is clicked', () => {
    it('THEN it should show an error message', () => {});
  });

  describe('WHEN the mutation failed', () => {
    it('THEN it should show an error snackbar', () => {});
  });
});

function initialize() {
  return render(<AddExpenseForm />, {
    wrapper: ({ children }) => (
      <>
        <SnackbarManager />
        {children}
      </>
    ),
  });
}
