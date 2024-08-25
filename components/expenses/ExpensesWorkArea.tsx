import ExpensesList from '@/components/expenses/ExpensesList';
import React from 'react';
import AppSafeAreaView from '../common/AppSafeAreaView';

function ExpensesWorkArea() {
  return (
    <AppSafeAreaView>
      <ExpensesList />
    </AppSafeAreaView>
  );
}

export default ExpensesWorkArea;
