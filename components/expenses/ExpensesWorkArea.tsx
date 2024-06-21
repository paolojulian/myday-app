import ExpensesList from '@/components/expenses/ExpensesList';
import React, { useState } from 'react';

function ExpensesWorkArea() {
  const [selectedDate] = useState(new Date());

  return <ExpensesList transactionDate={selectedDate} />;
}

export default ExpensesWorkArea;
