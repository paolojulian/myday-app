import ExpensesList from '@/components/expenses/ExpensesList';
import React from 'react';
import { SafeAreaView } from 'react-native';

function ExpensesWorkArea() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ExpensesList />
    </SafeAreaView>
  );
}

export default ExpensesWorkArea;
