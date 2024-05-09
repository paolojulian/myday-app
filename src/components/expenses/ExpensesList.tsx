import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import Stack from '../common/Stack';
import ExpenseItem from './ExpenseItem';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

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
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const expenses = MOCK_EXPENSES;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // If user is scrolling down, set isScrolling to true
    setIsScrollingDown(e.nativeEvent.contentOffset.y > 0);
    setIsScrollingUp(e.nativeEvent.contentOffset.y < 0);
  };

  return (
    <View style={styles.container}>
      {isScrollingDown && (
        <LinearGradient
          colors={['#00000033', '#00000000']}
          style={styles.shadowWhenScrollingDown}
        ></LinearGradient>
      )}
      <FlatList
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <ExpenseItem
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
      {isScrollingUp && (
        <LinearGradient
          colors={['#00000000', '#00000033']}
          style={styles.shadowWhenScrollingUp}
        ></LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
