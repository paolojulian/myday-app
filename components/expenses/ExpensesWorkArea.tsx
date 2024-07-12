import ExpensesList from '@/components/expenses/ExpensesList';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

function ExpensesWorkArea() {
  const [selectedDate] = useState(new Date());

  return (
    <SafeAreaView>
      <ExpensesList transactionDate={selectedDate} />
    </SafeAreaView>
  );
}

export default ExpensesWorkArea;
