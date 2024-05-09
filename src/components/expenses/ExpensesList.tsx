import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import ExpenseItem from './ExpenseItem';

const MOCK_EXPENSES = [
  {
    id: 'e1',
    name: 'Toilet Paper',
    amount: 94.12,
    date: '2024-07-14',
  },
  { id: 'e2', name: 'New TV', amount: 799.49, date: '2024-07-14' },
  {
    id: 'e3',
    name: 'Car Insurance',
    amount: 294.67,
    date: '2024-07-14',
  },
  {
    id: 'e4',
    name: 'New Desk (Wooden)',
    amount: 450,
    date: '2024-07-14',
  },
];

export default function ExpensesList() {
  const expenses = MOCK_EXPENSES;

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item }) => (
          <ExpenseItem
            onDelete={() => {}}
            id={item.id}
            date={item.date}
            name={item.name}
            notes=''
            amount={item.amount}
          />
        )}
        style={styles.flatListContainer}
        data={expenses}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  flatListContainer: {
    flex: 1,
  },
  shadowWhenScrollingDown: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 64,
  },
  shadowWhenScrollingUp: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
  },
});
