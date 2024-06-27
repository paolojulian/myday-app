import { migrations } from '@/database/migrations';
import { Migration } from '@/providers/DatabaseProvider/utils/migrateDbIfNeeded.util';
import * as MockEnv from '@/utils/config';

jest.mock('@/utils/config', () => ({
  getEnv: () => ({
    FORCE_MIGRATION: false,
    DATABASE_VERSION: 1,
  }),
}));

describe('TESTING Migration class', () => {
  describe('GIVEN force migration is true', () => {
    const mockExecAsync = jest.fn();
    const mockDb = {
      getFirstAsync: jest.fn(() => Promise.resolve(0)),
      execAsync: mockExecAsync,
      withTransactionAsync: jest.fn(cb => cb()),
    } as any;
    jest.spyOn(MockEnv, 'getEnv').mockReturnValue({ FORCE_MIGRATION: true, DATABASE_VERSION: 1 });
    const migrationsToRun = migrations;
    const numOfQueriesToRun = migrationsToRun.reduce(
      (previousValue, currentValue) => previousValue + currentValue.queries.length,
      0,
    );
    const expectedCalls = numOfQueriesToRun + 2; // 1 for updating user version and 1 for setting the pragma

    describe('WHEN migrateDbIfNeeded is called', () => {
      beforeEach(async () => {
        await new Migration(mockDb).migrateDbIfNeeded();
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
    jest.spyOn(MockEnv, 'getEnv').mockReturnValue({ FORCE_MIGRATION: false, DATABASE_VERSION: 1 });
    const migrationsToRun = migrations;
    const numOfQueriesToRun = migrationsToRun.reduce(
      (previousValue, currentValue) => previousValue + currentValue.queries.length,
      0,
    );
    const expectedCalls = numOfQueriesToRun + 2; // 1 for updating user version and 1 for setting the pragma

    describe('WHEN migrateDbIfNeeded is called', () => {
      beforeEach(async () => {
        await new Migration(mockDb as any).migrateDbIfNeeded();
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
    jest.spyOn(MockEnv, 'getEnv').mockReturnValue({ FORCE_MIGRATION: false, DATABASE_VERSION: 1 });

    describe('WHEN migrateDbIfNeeded is called', () => {
      beforeEach(async () => {
        await new Migration(mockDb as any).migrateDbIfNeeded();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('THEN it should not run any migrations', async () => {
        expect(mockDb.execAsync).not.toHaveBeenCalled();
      });
    });
  });
});
