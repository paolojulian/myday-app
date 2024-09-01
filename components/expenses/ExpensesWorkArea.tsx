import ExpensesList from '@/components/expenses/ExpensesList';
import React from 'react';
import AppSafeAreaView from '../common/AppSafeAreaView';
import GlowingHeader from '../common/GlowingHeader';

function ExpensesWorkArea() {
  return (
    <AppSafeAreaView edges={['top']}>
      <GlowingHeader variant="teal" />
      <ExpensesList />
    </AppSafeAreaView>
  );
}

export default ExpensesWorkArea;
