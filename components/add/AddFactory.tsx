import { SupportedAddItems } from '@/app/add';
import AddExpenseForm from '@/components/add/AddExpenseForm';
import AddJournalForm from '@/components/add/AddJournalForm';
import AddTaskForm from '@/components/add/AddTaskForm/AddTaskForm';
import React from 'react';

type AddFactoryProps = {
  type: SupportedAddItems;
};

function AddFactory({ type }: AddFactoryProps) {
  switch (type) {
    case 'Expense':
      return <AddExpenseForm />;
    case 'Todo':
      return <AddTaskForm />;
    case 'Journal':
      return <AddJournalForm />;
  }
}

export default AddFactory;
