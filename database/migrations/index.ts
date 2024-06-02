import { expenseMigrations } from './expense';
import { categoryMigrations } from './category';
import { journalMigrations } from './journal';
import { taskMigrations } from './task';

export const migrations = [
  {
    version: 1,
    dataMigrations: [
      expenseMigrations[0],
      categoryMigrations[0],
      journalMigrations[0],
      taskMigrations[0],
    ],
  },
];
