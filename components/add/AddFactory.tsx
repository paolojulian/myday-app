import { SupportedAddItems } from '@/app/add';
import AddExpenseForm from '@/components/add/AddExpenseForm';
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
  }
}

export default AddFactory;
