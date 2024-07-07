import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { MigrateOnInit } from '@/providers/DatabaseProvider/utils/migrateDbIfNeeded.util';
import { RecurringExpenses } from '@/providers/DatabaseProvider/utils/runRecurringExpenses.util';
import dayjs from 'dayjs';
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
        <ThemedView
          style={{
            flex: 1,
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </ThemedView>
      }
    >
      <SQLite.SQLiteProvider
        databaseName="myday.db"
        assetSource={{
          assetId: require('../../assets/myday.db'),
        }}
        onInit={onInit}
        useSuspense
      >
        {children}
      </SQLite.SQLiteProvider>
    </Suspense>
  );
}

async function onInit(db: SQLite.SQLiteDatabase) {
  const migrateOnInit = new MigrateOnInit(db);
  await migrateOnInit.migrateDbIfNeeded();

  const recurringExpenses = new RecurringExpenses(migrateOnInit.db, dayjs());
  await recurringExpenses.populate();
}
