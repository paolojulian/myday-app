import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { migrations } from '@/database/migrations';
import * as SQLite from 'expo-sqlite';
import { ReactNode, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

type DatabaseProviderProps = {
  children: ReactNode;
};

export default function DatabaseProvider({ children }: DatabaseProviderProps) {
  return (
    <Suspense
      fallback={
        <ThemedView style={{ flex: 1, backgroundColor: colors.white }}>
          <ActivityIndicator size="large" />
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      }
    >
      <SQLite.SQLiteProvider
        databaseName="myday.db"
        assetSource={{
          assetId: require('../assets/myday.db'),
        }}
        onInit={migrateDbIfNeeded}
        useSuspense
      >
        {children}
      </SQLite.SQLiteProvider>
    </Suspense>
  );
}

async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
  console.log('Migrating database');
  if (!shouldRunMigration(db)) {
    console.log('No migrations to run');
    return;
  }

  const migrationsToRun = getMigrationsToRun();
  const userLocalDbVersion = await getUserLocalDbVersion(db);
  console.log('Migrating database to version: ', getCurrentDbVersion());
  console.log('User local database version: ', userLocalDbVersion);
  console.log('Migrations to run: ', migrationsToRun);

  // Apply the migrations
  for (const { dataMigrations } of migrationsToRun) {
    for (const { table, inserts, version } of dataMigrations) {
      if (table) {
        await db.execAsync(table);
      }
      if (inserts) {
        await db.runAsync(inserts);
      }
      await updateUserLocalDbVersion(db, version);
    }
  }

  const currentDbVersion = getCurrentDbVersion();
  console.log('Database migrated successfully to version: ', currentDbVersion);
  await updateUserLocalDbVersion(db, currentDbVersion);
}

async function updateUserLocalDbVersion(db: SQLite.SQLiteDatabase, version: number) {
  await db.execAsync(`PRAGMA user_version = ${version}`);
}

async function shouldRunMigration(db: SQLite.SQLiteDatabase): Promise<boolean> {
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

async function getUserLocalDbVersion(db: SQLite.SQLiteDatabase) {
  // Get the current database version from the user's local database
  const pragma = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let userLocalDbVersion = pragma?.user_version || 0;
  return userLocalDbVersion;
}

function getCurrentDbVersion() {
  return Number(process.env.EXPO_PUBLIC_DATABASE_VERSION) ?? 1;
}

function getMigrationsToRun() {
  // Get the version to migrate to from the environment variables
  const currentDbVersion = getCurrentDbVersion();
  if (shouldForceMigrate()) {
    return migrations;
  }

  // Get the migrations
  const latestMigrations = migrations
    .filter(
      migration => migration.version > currentDbVersion && migration.version <= currentDbVersion,
    )
    .filter(migration => {
      migration.dataMigrations.forEach(({ version }) => {
        if (version <= currentDbVersion) {
          return false;
        }
        return true;
      });
    });

  if (latestMigrations.length === 0) {
    throw new Error(`No migrations found up to ${currentDbVersion}`);
  }

  return latestMigrations;
}

function shouldForceMigrate() {
  return Boolean(process.env.EXPO_PUBLIC_FORCE_MIGRATION);
}
