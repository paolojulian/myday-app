import { SupportedAddItems } from '@/app/add';
import AddExpenseForm from '@/components/add/AddExpenseForm';
import AddTodoForm from '@/components/add/AddTodoForm';
import React from 'react';
import { View } from 'react-native';

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
      return <View></View>;
  }
}

export default AddFactory;
