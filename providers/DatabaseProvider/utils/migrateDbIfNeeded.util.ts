import { migrations } from '@/database/migrations';
import { getEnv } from '@/utils/config';
import { type SQLiteDatabase } from 'expo-sqlite';

const env = getEnv();
export class Migration {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  migrateDbIfNeeded = async () => {
    console.log('Migrating database');
    const shouldMigrate = await this.shouldRunMigration();
    if (!shouldMigrate) {
      console.log('Up-to-date');
      return;
    }

    const migrationsToRun = await this.getMigrationsToRun();
    const userLocalDbVersion = await this.getUserLocalDbVersion();
    console.log('User local database version: ', userLocalDbVersion);
    console.log('Migrating database to version: ', this.getCurrentDbVersion());

    // Apply the migrations
    this.db.withTransactionAsync(async () => {
      await this.db.execAsync(`PRAGMA journal_mode = 'wal'`);
      for (const { queries } of migrationsToRun) {
        for (const { query } of queries) {
          if (query) {
            await this.db.execAsync(query);
          }
        }
      }

      const currentDbVersion = this.getCurrentDbVersion();
      await this.updateUserLocalDbVersion(currentDbVersion);
    });
  };

  private shouldRunMigration = async (): Promise<boolean> => {
    if (this.shouldForceMigrate()) {
      return true;
    }

    // Get the version to migrate to from the environment variables
    const currentDbVersion = this.getCurrentDbVersion();
    const userLocalDbVersion = await this.getUserLocalDbVersion();

    if (userLocalDbVersion >= currentDbVersion) {
      return false;
    }

    return true;
  };

  private async getMigrationsToRun() {
    // Get the version to migrate to from the environment variables
    const currentDbVersion = this.getCurrentDbVersion();
    if (this.shouldForceMigrate()) {
      return migrations;
    }

    const userLocalDbVersion = await this.getUserLocalDbVersion();

    // Get the migrations
    const latestMigrations = migrations.filter(
      migration => migration.version > userLocalDbVersion && migration.version <= currentDbVersion,
    );

    if (latestMigrations.length === 0) {
      throw new Error(`No migrations found up to ${currentDbVersion}`);
    }

    return latestMigrations;
  }

  private getUserLocalDbVersion = async () => {
    // Get the current database version from the user's local database
    const pragma = await this.db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    let userLocalDbVersion = pragma?.user_version || 0;
    return userLocalDbVersion;
  };

  private getCurrentDbVersion() {
    return env.DATABASE_VERSION;
  }

  private shouldForceMigrate() {
    return env.FORCE_MIGRATION;
  }

  private updateUserLocalDbVersion = async (version: number) => {
    await this.db.execAsync(`PRAGMA user_version = ${version}`);
    console.log('Database migrated successfully to version: ', version);
  };
}
