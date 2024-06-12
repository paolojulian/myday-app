import { Migration } from '@/database/migrations/migration.types';
import { expenseMigrations } from './expense';
import { categoryMigrations } from '@/database/migrations/category';
import { journalMigrations } from '@/database/migrations/journal';
import { taskMigrations } from '@/database/migrations/task';

export const migrations: Migration[] = [
  {
    version: 1,
    queries: [
      ...expenseMigrations[0].queries,
      ...categoryMigrations[0].queries,
      ...journalMigrations[0].queries,
      ...taskMigrations[0].queries,
    ],
  },
];
