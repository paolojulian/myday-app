import { expensesMigrations } from './expenses';

export const migrations = [
  {
    version: 1,
    dataMigrations: [expensesMigrations[0]],
  },
  {
    version: 2,
    dataMigrations: [expensesMigrations[1]],
  },
];
