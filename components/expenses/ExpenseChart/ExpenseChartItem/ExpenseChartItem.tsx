import { colors } from '@/constants/Colors';
import React from 'react';
import { View } from 'react-native';
import ExpenseChartItemMonth from './ExpenseChartItemMonth';
import ExpenseChartItemAmount from './ExpenseChartItemAmount';

type Props = {
  amount: number;
  title: string;
  isCurrent?: boolean;
};

function ExpenseChartItem({ title, amount, isCurrent = false }: Props) {
  return (
    <View style={{ flexDirection: 'column', gap: 8, alignItems: 'stretch', marginHorizontal: 4 }}>
      <ExpenseChartItemAmount amount={amount} />
      <View
        style={{
          width: 72,
          height: 130,
          backgroundColor: colors.slateGrey[500],
          borderRadius: 16,
        }}
      ></View>
      <ExpenseChartItemMonth title={title} variant={isCurrent ? 'current' : 'default'} />
    </View>
  );
}

export default ExpenseChartItem;
