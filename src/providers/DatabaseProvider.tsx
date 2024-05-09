import * as SQLite from 'expo-sqlite';
import { ReactNode, Suspense } from 'react';
import { Text } from 'react-native';

type DatabaseProviderProps = {
  children: ReactNode;
};

export default function DatabaseProvider({ children }: DatabaseProviderProps) {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SQLite.SQLiteProvider
        databaseName='myday.db'
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
  const DATABASE_VERSION = 1;
  const pragma = await db.getFirstAsync<{
    user_version: number;
  }>('PRAGMA user_version');
  let currentDbVersion = pragma?.user_version || 0;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS Expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        description TEXT NOT NULL
      );
    `);
    await db.runAsync(
      "INSERT INTO Expenses (amount, description) VALUES (100000, 'Gambling allowance')"
    );
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
