import { migrations } from '@/database/migrations';
import { type SQLiteDatabase } from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  console.log('Migrating database');
  const shouldMigrate = await shouldRunMigration(db);
  if (!shouldMigrate) {
    console.log('Up-to-date');
    return;
  }

  const migrationsToRun = await getMigrationsToRun(db);
  const userLocalDbVersion = await getUserLocalDbVersion(db);
  console.log('User local database version: ', userLocalDbVersion);
  console.log('Migrating database to version: ', getCurrentDbVersion());
  console.log('Migrations to run: ', migrationsToRun);

  // Apply the migrations
  await db.execAsync(`PRAGMA journal_mode = 'wal'`);
  for (const { queries } of migrationsToRun) {
    for (const { query } of queries) {
      if (query) {
        await db.execAsync(query);
      }
    }
  }

  const currentDbVersion = getCurrentDbVersion();
  await updateUserLocalDbVersion(db, currentDbVersion);
  console.log('Database migrated successfully to version: ', currentDbVersion);
}

async function updateUserLocalDbVersion(db: SQLiteDatabase, version: number) {
  await db.execAsync(`PRAGMA user_version = ${version}`);
}

async function shouldRunMigration(db: SQLiteDatabase): Promise<boolean> {
  if (shouldForceMigrate()) {
    return true;
  }

  // Get the version to migrate to from the environment variables
  const currentDbVersion = getCurrentDbVersion();
  const userLocalDbVersion = await getUserLocalDbVersion(db);

  if (userLocalDbVersion >= currentDbVersion) {
    return false;
  }

  return true;
}

async function getUserLocalDbVersion(db: SQLiteDatabase) {
  // Get the current database version from the user's local database
  const pragma = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let userLocalDbVersion = pragma?.user_version || 0;
  return userLocalDbVersion;
}

function getCurrentDbVersion() {
  return Number(process.env.EXPO_PUBLIC_DATABASE_VERSION) ?? 1;
}

async function getMigrationsToRun(db: SQLiteDatabase) {
  // Get the version to migrate to from the environment variables
  const currentDbVersion = getCurrentDbVersion();
  if (shouldForceMigrate()) {
    return migrations;
  }

  const userLocalDbVersion = await getUserLocalDbVersion(db);

  // Get the migrations
  const latestMigrations = migrations.filter(
    migration => migration.version > userLocalDbVersion && migration.version <= currentDbVersion,
  );

  if (latestMigrations.length === 0) {
    throw new Error(`No migrations found up to ${currentDbVersion}`);
  }

  return latestMigrations;
}

function shouldForceMigrate() {
  return process.env.EXPO_PUBLIC_FORCE_MIGRATION === 'true';
}
