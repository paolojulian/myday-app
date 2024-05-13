import * as SQLite from 'expo-sqlite';
import { ReactNode, Suspense } from 'react';
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

  const pragma = await db.getFirstAsync<{
    user_version: number;
  }>('PRAGMA user_version');

  console.log({ DATABASE_VERSION, pragma });

  let currentDbVersion = pragma?.user_version || 0;

  // Check if the database is already at the latest version
  if (currentDbVersion >= DATABASE_VERSION) {
    // Database is already at the latest version
    return;
  }

  // Get the migrations
  const migrationsForCurrentVersion = migrations.find(
    migration => migration.version === DATABASE_VERSION,
  );
  if (!migrationsForCurrentVersion) {
    throw new Error(`No migrations found for version ${DATABASE_VERSION}`);
  }

  migrationsForCurrentVersion.dataMigrations.forEach(async ({ table, inserts }) => {
    if (table) {
      await db.execAsync(table);
    }
    if (inserts) {
      await db.runAsync(inserts);
    }
    currentDbVersion = DATABASE_VERSION;
  });

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
