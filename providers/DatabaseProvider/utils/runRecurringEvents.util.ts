import { RecurringExpenses } from '@/providers/DatabaseProvider/utils/runRecurringExpenses.util';
import dayjs, { Dayjs } from 'dayjs';
import { type SQLiteDatabase } from 'expo-sqlite';

export class RecurringEvents {
  db: SQLiteDatabase;
  now: Dayjs;

  constructor(db: SQLiteDatabase) {
    this.db = db;
    this.now = dayjs();
  }

  async populate() {
    new RecurringExpenses(this.db, this.now).populate();
  }
}
