import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';
import { View } from 'react-native';

type Variants = 'default' | 'current';

type Props = {
  title: string;
  variant?: Variants;
};

function ExpenseChartItemMonth({ title, variant = 'default' }: Props) {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: variant === 'default' ? colors.slateGrey[500] : colors.black,
        paddingVertical: 8,
        borderRadius: 16,
      }}
    >
      <ThemedText style={{ color: colors.white }}>{title}</ThemedText>
    </View>
  );
}

export default ExpenseChartItemMonth;
