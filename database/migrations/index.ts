import { expenseMigrations } from './expense';
import { categoryMigrations } from './category';
import { journalMigrations } from './journal';
import { taskMigrations } from './task';

export const migrations = [
  {
    version: 1,
    dataMigrations: [expenseMigrations[0]],
  },
  {
    version: 1,
    dataMigrations: [categoryMigrations[0]],
  },
  {
    version: 1,
    dataMigrations: [journalMigrations[0]],
  },
  {
    version: 1,
    dataMigrations: [taskMigrations[0]],
  },
];
