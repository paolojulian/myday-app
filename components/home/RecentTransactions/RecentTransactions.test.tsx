import * as UseExpensesMock from '@/hooks/services/expense/useExpenses';
import { render, screen } from '@testing-library/react-native';
import RecentTransactions from './RecentTransactions';
import dayjs from 'dayjs';

jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  useNavigation: jest.fn(),
}));
jest.mock('@/hooks/services/expense/useExpenses');

describe('TESTING RecentTransactions component', () => {
  describe('GIVEN expenses', () => {
    it('THEN it should display the expenses', () => {
      jest.spyOn(UseExpensesMock, 'default').mockImplementation(
        () =>
          ({
            data: [
              {
                id: 1,
                amount: 200,
                category_id: null,
                category_name: null,
                created_at: dayjs().startOf('day').unix(),
                deleted_at: null,
                description: 'No',
                recurrence: null,
                recurrence_id: null,
                title: 'Mock Expense Title',
                transaction_date: dayjs().startOf('day').unix(),
                updated_at: null,
              },
            ],
            isLoading: false,
          }) as any,
      );
      initializeComponent();

      expect(screen.getByText('Mock Expense Title')).toBeDefined();
    });
  });

  describe('GIVEN 0 recent expenses', () => {
    it('THEN it should show "No recent transactions"', () => {
      jest.spyOn(UseExpensesMock, 'default').mockImplementation(
        () =>
          ({
            data: [],
            isLoading: false,
          }) as any,
      );
      initializeComponent();

      expect(screen.getByText('No recent transactions')).toBeDefined();
    });
  });
});

function initializeComponent() {
  return render(<RecentTransactions />);
}
