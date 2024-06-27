import { migrations } from '@/database/migrations';
import { Migration } from '@/database/migrations/migration.types';
import { MigrateOnInit as MigrationClass } from '@/providers/DatabaseProvider/utils/migrateDbIfNeeded.util';
import * as MockEnv from '@/utils/config';

jest.mock('@/utils/config');

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  (console.log as any).mockRestore();
  (console.error as any).mockRestore();
  (console.warn as any).mockRestore();
});

describe('TESTING Migration class', () => {
  describe('GIVEN force migration is true, and user database is latest', () => {
    const mockExecAsync = jest.fn();
    const mockDb = {
      getFirstAsync: jest.fn(() => Promise.resolve({ user_version: 1 })),
      execAsync: mockExecAsync,
      withTransactionAsync: jest.fn(cb => cb()),
    } as any;
    const migrationsToRun = migrations;
    const numOfQueriesToRun = migrationsToRun.reduce(
      (previousValue, currentValue) => previousValue + currentValue.queries.length,
      0,
    );
    const expectedCalls = numOfQueriesToRun + 2; // 1 for updating user version and 1 for setting the pragma

    describe('WHEN migrateDbIfNeeded is called', () => {
      beforeEach(async () => {
        jest
          .spyOn(MockEnv, 'getEnv')
          .mockReturnValue({ FORCE_MIGRATION: true, DATABASE_VERSION: 1 });
        await new MigrationClass(mockDb, migrationsToRun).migrateDbIfNeeded();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('THEN it should set the journal mode to wal', () => {
        expect(mockExecAsync).toHaveBeenNthCalledWith(1, `PRAGMA journal_mode = 'wal'`);
      });
      it('THEN it should run all migrations', () => {
        expect(mockExecAsync).toHaveBeenCalledTimes(expectedCalls);
      });
      it('THEN it should update the user version after completing the migration', () => {
        expect(mockExecAsync).toHaveBeenNthCalledWith(expectedCalls, `PRAGMA user_version = 1`);
      });
    });
  });

  describe('GIVEN force migration is false and user database version is 0', () => {
    const mockDb = {
      getFirstAsync: jest.fn(() => Promise.resolve(0)),
      execAsync: jest.fn(),
      withTransactionAsync: jest.fn(cb => cb()),
    };
    const migrationsToRun = migrations;
    const numOfQueriesToRun = migrationsToRun.reduce(
      (previousValue, currentValue) => previousValue + currentValue.queries.length,
      0,
    );
    const expectedCalls = numOfQueriesToRun + 2; // 1 for updating user version and 1 for setting the pragma

    describe('WHEN migrateDbIfNeeded is called', () => {
      beforeEach(async () => {
        jest
          .spyOn(MockEnv, 'getEnv')
          .mockReturnValue({ FORCE_MIGRATION: false, DATABASE_VERSION: 1 });
        await new MigrationClass(mockDb as any).migrateDbIfNeeded();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('THEN it should set the journal mode to wal', () => {
        expect(mockDb.execAsync).toHaveBeenNthCalledWith(1, `PRAGMA journal_mode = 'wal'`);
      });
      it('THEN it should run all migrations from 0 to latest', () => {
        expect(mockDb.execAsync).toHaveBeenCalledTimes(expectedCalls);
      });
      it('THEN it should update the user version after completing the migration', () => {
        expect(mockDb.execAsync).toHaveBeenNthCalledWith(expectedCalls, `PRAGMA user_version = 1`);
      });
    });
  });

  describe('GIVEN force migration is false and user database version is the latest', () => {
    const mockDb = {
      getFirstAsync: jest.fn(() => Promise.resolve({ user_version: 1 })),
      execAsync: jest.fn(),
      withTransactionAsync: jest.fn(cb => cb()),
    };

    describe('WHEN migrateDbIfNeeded is called', () => {
      beforeEach(async () => {
        jest
          .spyOn(MockEnv, 'getEnv')
          .mockReturnValue({ FORCE_MIGRATION: false, DATABASE_VERSION: 1 });
        await new MigrationClass(mockDb as any).migrateDbIfNeeded();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('THEN it should not run any migrations', async () => {
        expect(mockDb.execAsync).not.toHaveBeenCalled();
      });
    });
  });

  describe('GIVEN user database version is not the latest', () => {
    const mockMigrations = [
      {
        version: 1,
        queries: [
          {
            query: 'CREATE TABLE test (id INTEGER PRIMARY KEY)',
          },
          {
            query: 'CREATE TABLE test (id INTEGER PRIMARY KEY)',
          },
        ],
      },
      {
        version: 2,
        queries: [
          {
            query: 'CREATE TABLE test (id INTEGER PRIMARY KEY)',
          },
          {
            query: 'CREATE TABLE test (id INTEGER PRIMARY KEY)',
          },
        ],
      },
    ] satisfies Migration[];
    const mockDb = {
      getFirstAsync: jest.fn(() => Promise.resolve({ user_version: 1 })),
      execAsync: jest.fn(),
      withTransactionAsync: jest.fn(cb => cb()),
    };

    describe('WHEN migrateDbIfNeeded is called', () => {
      beforeEach(async () => {
        jest
          .spyOn(MockEnv, 'getEnv')
          .mockReturnValue({ FORCE_MIGRATION: false, DATABASE_VERSION: 2 });
        new MigrationClass(mockDb as any, mockMigrations).migrateDbIfNeeded();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('THEN it should only run migrations from the user version to the latest', async () => {
        const expectedMigrationCalls = 2;
        const pragmaAndUpdateVersionCalls = 2;
        const totalExpectedCalls = expectedMigrationCalls + pragmaAndUpdateVersionCalls;
        expect(mockDb.execAsync).toHaveBeenCalledTimes(totalExpectedCalls);
      });
    });
  });
});
