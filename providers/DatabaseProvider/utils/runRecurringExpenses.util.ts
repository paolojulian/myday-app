import { Expense } from '@/hooks/services/expense/expense.types';
import dayjs, { type Dayjs } from 'dayjs';
import { type SQLiteDatabase } from 'expo-sqlite';

export type RecurringExpense = Expense & { latest_recurred_transaction_date: number };

export class RecurringExpenses {
  db: SQLiteDatabase;
  now: Dayjs;

  constructor(db: SQLiteDatabase, now?: Dayjs) {
    this.db = db;
    this.now = now || dayjs();
  }

  async populate() {
    const recurringExpenses = await this.fetchRecurringExpenses();
    recurringExpenses.forEach(expense => {
      this.processRecurringExpense(expense);
    });
  }

  private async fetchRecurringExpenses() {
    return await this.db.getAllAsync<RecurringExpense>(GET_LATEST_RECURRING_EXPENSES);
  }

  private async processRecurringExpense(recurringExpense: RecurringExpense) {
    switch (recurringExpense.recurrence) {
      case 'weekly':
        this.processRecurringExpenseByInterval(recurringExpense, 'weeks');
        break;
      case 'monthly':
        this.processRecurringExpenseByInterval(recurringExpense, 'months');
        break;
      case 'yearly':
        this.processRecurringExpenseByInterval(recurringExpense, 'years');
        break;
      default:
    }
  }

  private async processRecurringExpenseByInterval(
    recurringExpense: RecurringExpense,
    interval: 'weeks' | 'months' | 'years',
  ) {
    const latestRecurredTransactionDate = dayjs.unix(
      recurringExpense.latest_recurred_transaction_date ?? recurringExpense.transaction_date,
    );
    const timePassed = this.now.diff(latestRecurredTransactionDate, interval);

    const addRecurringExpenseStatement = await this.db.prepareAsync(ADD_RECURRED_EXPENSE);
    try {
      for (let i = 1; i <= timePassed; i++) {
        await addRecurringExpenseStatement.executeAsync({
          $title: recurringExpense.title,
          $amount: recurringExpense.amount,
          $description: recurringExpense.description,
          $category_id: recurringExpense.category_id,
          $transaction_date: dayjs(latestRecurredTransactionDate)
            .startOf('day')
            .add(i, interval)
            .unix(),
          $recurrence_id: recurringExpense.id,
          $created_at: this.now.unix(),
          $updated_at: this.now.unix(),
        });
      }
    } catch (e: any) {
      throw new Error('Failed to add recurring expenses: ' + e.message);
    } finally {
      await addRecurringExpenseStatement.finalizeAsync();
      console.log('Successfully added recurring expenses.');
    }
  }
}

const ADD_RECURRED_EXPENSE = /* sql */ `
  INSERT INTO Expense (title, amount, description, category_id, transaction_date, recurrence_id, created_at, updated_at)
  VALUES ($title, $amount, $description, $category_id, $transaction_date, $recurrence_id, $created_at, $updated_at)
`;

const GET_LATEST_RECURRING_EXPENSES = /* sql */ `
  SELECT e1.*, MAX(e2.transaction_date) as latest_recurred_transaction_date
  FROM expense e1
  LEFT JOIN expense e2 ON e1.id = e2.recurrence_id
  WHERE e1.recurrence IS NOT NULL
  GROUP BY e1.id;
`;
