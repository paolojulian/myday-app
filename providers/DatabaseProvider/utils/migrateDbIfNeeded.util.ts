import { migrations } from '@/database/migrations';
import { Migration } from '@/database/migrations/migration.types';
import { getEnv } from '@/utils/config';
import { type SQLiteDatabase } from 'expo-sqlite';

export class MigrateOnInit {
  private db: SQLiteDatabase;
  private migrations: Migration[];

  constructor(db: SQLiteDatabase, customMigrations: Migration[] = migrations) {
    this.db = db;
    this.migrations = customMigrations;
  }

  migrateDbIfNeeded = async () => {
    const userLocalDbVersion = await this.getUserLocalDbVersion();
    console.log(`
      ========================================
      MIGRATION
      Local version: ${userLocalDbVersion}
      Update version: ${this.getCurrentDbVersion()}
    `);

    const shouldMigrate = await this.shouldRunMigration();
    if (!shouldMigrate) {
      console.log(`
        END OF MIGRATION
        Database is up-to-date
        ========================================
      `);
      return;
    }

    const migrationsToRun = await this.getMigrationsToRun();
    console.log(`
      -- Migration versions to run: ${migrationsToRun.map(migration => migration.version).join(', ')}
    `);

    // Apply the migrations
    try {
      await this.db.withTransactionAsync(async () => {
        console.log('-- Setting journal mode to WAL');
        await this.db.execAsync(`PRAGMA journal_mode = 'wal'`);
        console.log('-- Done setting journal mode to WAL');
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
    } catch (e) {
      console.error('Error migrating database: ', e);
    }
    console.log(`
      END OF MIGRATION
      Database migrated successfully to version: ${this.getCurrentDbVersion()}
      ========================================
    `);
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
      return this.migrations;
    }

    const userLocalDbVersion = await this.getUserLocalDbVersion();

    // Get the migrations
    const latestMigrations = this.migrations.filter(
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
    return getEnv().DATABASE_VERSION;
  }

  private shouldForceMigrate() {
    return getEnv().FORCE_MIGRATION;
  }

  private updateUserLocalDbVersion = async (version: number) => {
    await this.db.execAsync(`PRAGMA user_version = ${version}`);
  };
}
