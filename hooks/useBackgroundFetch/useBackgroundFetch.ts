import { RecurringExpenses } from '@/providers/DatabaseProvider/utils/runRecurringExpenses.util';
import dayjs from 'dayjs';
import * as BackgroundFetch from 'expo-background-fetch';
import { openDatabaseAsync } from 'expo-sqlite';
import * as TaskManager from 'expo-task-manager';
import { useEffect } from 'react';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
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

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
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
