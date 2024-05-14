import * as SQLite from 'expo-sqlite';
import { ReactNode, Suspense, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Typography from '../components/common/Typography';
import { colors } from '../utils/theme/colors';
import { migrations } from '../database/migrations';

type DatabaseProviderProps = {
  children: ReactNode;
};

export default function DatabaseProvider({ children }: DatabaseProviderProps) {
  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <ActivityIndicator size="large" />
          <Typography>Loading...</Typography>
        </View>
      }
    >
      <SQLite.SQLiteProvider
        databaseName="myday.db"
        assetSource={{
          assetId: require('../../assets/myday.db'),
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
  const DATABASE_VERSION = Number(process.env.EXPO_PUBLIC_DATABASE_VERSION) ?? 1;

  // Get the current database version from the user's local database
  const pragma = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');

  let currentDbVersion = pragma?.user_version || 0;

  // Check if the database is already at the latest version
  if (currentDbVersion >= DATABASE_VERSION) {
    // Database is already at the latest version
    return;
  }

  // Get the migrations
  const latestMigrations = migrations.filter(
    migration => migration.version > currentDbVersion && migration.version <= DATABASE_VERSION,
  );

  if (latestMigrations.length === 0) {
    throw new Error(`No migrations found up to ${DATABASE_VERSION}`);
  }

  // Apply the migrations
  for (const { dataMigrations } of latestMigrations) {
    for (const { table, inserts, version } of dataMigrations) {
      if (version > currentDbVersion) {
        if (table) {
          await db.execAsync(table);
        }
        if (inserts) {
          await db.runAsync(inserts);
        }
        currentDbVersion = version;
        await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
      }
    }
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
