import { Migrations } from '@/database/migrations/types';
import { categoryMigrations } from './category';
import { expenseMigrations } from './expense';
import { journalMigrations } from './journal';
import { taskMigrations } from './task';

export const migrations: Migrations[] = [
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
