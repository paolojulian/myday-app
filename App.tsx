import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import DatabaseProvider from './src/providers/DatabaseProvider';

export default function App() {
  // console.log("Loaded");

  // async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
  //   console.log("Opening DB")
  //   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
  //     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  //   }
  //   const asset = await Asset.fromModule(require('./assets/myday.db')).downloadAsync();
  //   console.log(asset.localUri)
  //   await FileSystem.copyAsync({
  //     from: asset.localUri,
  //     to: FileSystem.documentDirectory + 'SQLite/myday.db',
  //   });
  //   return SQLite.openDatabase('myday.db');
  // }

  // async function fetchData() {
  //   console.log("Fetching data..")

  //   const db = openDatabase;
  //   console.log(db)
  //   const readOnly = true;
  //   //d matrigger to
  //   await db.transactionAsync(async tx => {
  //     console.log("DB transaction starting...")
  //     console.log(tx)
  //     const result = await tx.executeSqlAsync('SELECT * FROM Expenses', [])
  //     console.log(result.rows);
  //   }, readOnly);
  // }
  // fetchData();

  return (
    <DatabaseProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </DatabaseProvider>
  );
}
