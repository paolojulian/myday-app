import { RecurringExpenses } from '@/providers/DatabaseProvider/utils/runRecurringExpenses.util';
import dayjs from 'dayjs';
import * as BackgroundFetch from 'expo-background-fetch';
import { openDatabaseAsync } from 'expo-sqlite';
import * as TaskManager from 'expo-task-manager';
import { useEffect } from 'react';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();
  const db = await openDatabaseAsync('myday.db');
  if (!db) {
    return BackgroundFetch.BackgroundFetchResult.NewData;
  }

  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
  await new RecurringExpenses(db, dayjs(now)).populate();

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export function useBackgroundFetch() {
  const registerTasks = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);

    console.log(`Background fetch status: ${status}`);

    if (
      status === BackgroundFetch.BackgroundFetchStatus.Restricted ||
      status === BackgroundFetch.BackgroundFetchStatus.Denied
    ) {
      return;
    }

    if (!isRegistered) {
      await registerBackgroundFetchAsync();
      console.log('Registered background fetch task');
    }
  };

  useEffect(() => {
    registerTasks();
  }, []);
}
