import AddExpenseForm from '@/components/add/AddExpenseForm/AddExpenseForm';
import { ADD_EXPENSE_FORM_TEST_IDS } from '@/components/add/AddExpenseForm/AddExpenseForm.utils';
import { fireEvent, render } from '@testing-library/react-native';

jest.mock('@/hooks/services/expense/useCreateExpenses', () => {
  return jest.fn(() => ({
    mutate: jest.fn(),
  }));
});

describe('TESTING AddExpenseForm', () => {
  describe('WHEN AddExpenseForm is rendered', () => {
    it('THEN it should render correctly', () => {
      const screen = render(<AddExpenseForm />);
      expect(screen).toBeTruthy();
    });
  });

  describe('WHEN the fields are filled correctly and submit button is clicked', () => {
    it('THEN it should submit the form', () => {
      const screen = render(<AddExpenseForm />);
      const title = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.title);
      const category = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.category);
      const amount = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.amount);
      const description = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.description);
      const submitBtn = screen.getByTestId(ADD_EXPENSE_FORM_TEST_IDS.saveButton);

      fireEvent.changeText(title, 'Groceries');
      fireEvent.changeText(category, 'Groceries');
      fireEvent.changeText(amount, '3000');
      fireEvent.changeText(description, 'SM Baguio');
      fireEvent.press(submitBtn);

      // Expect the mutation to be called
      // Expect the form to be reset
      // Expect the success snackbar to show
    });
  });

  describe('WHEN the fields are not filled correctly and submit button is clicked', () => {
    it('THEN it should show an error message', () => {});
  });

  describe('WHEN the mutation failed', () => {
    it('THEN it should show an error snackbar', () => {});
  });
});
