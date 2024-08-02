import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';
import { View } from 'react-native';

type Props = {
  amount: number;
};
function ExpenseChartItemAmount({ amount }: Props) {
  return (
    <View style={{ alignItems: 'center' }}>
      <ThemedText style={{ color: colors.slateGrey[500] }}>{amount.toLocaleString()}</ThemedText>
    </View>
  );
}

export default ExpenseChartItemAmount;
