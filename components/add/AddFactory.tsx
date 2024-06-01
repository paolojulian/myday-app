import { SupportedAddItems } from '@/app/add';
import AddExpenseForm from '@/components/add/AddExpenseForm';
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
    case 'Journal':
      return <View></View>;
  }
}

export default AddFactory;
