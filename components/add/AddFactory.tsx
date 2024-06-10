import { SupportedAddItems } from '@/app/add';
import AddExpenseForm from '@/components/add/AddExpenseForm';
import AddJournalForm from '@/components/add/AddJournalForm';
import AddTodoForm from '@/components/add/AddTodoForm';
import React from 'react';

type AddFactoryProps = {
  type: SupportedAddItems;
};

function AddFactory({ type }: AddFactoryProps) {
  switch (type) {
    case 'Expense':
      return <AddExpenseForm />;
    case 'Todo':
      return <AddTodoForm />;
    case 'Journal':
      return <AddJournalForm />;
  }
}

export default AddFactory;
