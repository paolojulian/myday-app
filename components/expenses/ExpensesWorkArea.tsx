import ExpensesList from '@/components/expenses/ExpensesList';
import React from 'react';
import { SafeAreaView } from 'react-native';

function ExpensesWorkArea() {
  return (
    <SafeAreaView>
      <ExpensesList />
    </SafeAreaView>
  );
}

export default ExpensesWorkArea;
