import { colors } from '@/constants/Colors';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import AppCard from '../common/AppCard';
import Stack from '../common/Stack';
import ThemedText from '../common/ThemedText';
import MoneyIcon from '../common/icons/MoneyIcon';
import { useFocusEffect } from 'expo-router';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { useTotalExpenses } from '@/hooks/services/expense/useTotalExpenses';

function HomeSpentToday() {
  const today = useMemo(() => new Date(), []);

  const { data: totalExpensesToday, refetch: refetchTotalExpenses } = useTotalExpenses({
    transactionDate: today,
    type: 'daily',
  });

  useFocusEffect(() => {
    refetchTotalExpenses();
  });

  const spentToday = {
    color: totalExpensesToday > 0 ? colors.v2.black : colors.v2.black,
    text:
      totalExpensesToday > 0
        ? `-${toLocaleCurrencyFormat(totalExpensesToday)}`
        : toLocaleCurrencyFormat(totalExpensesToday),
  };

  return (
    <AppCard
      style={{
        backgroundColor: colors.v2.orange,
        height: 240,
      }}
    >
      <Stack style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <View style={{ marginBottom: 16 }}>
          <MoneyIcon />
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <ThemedText variant="header-lg" style={{ color: spentToday.color }}>
            {spentToday.text}
          </ThemedText>
          <ThemedText variant="title-sm" color="inverted">
            Spent Today
          </ThemedText>
        </View>
      </Stack>
    </AppCard>
  );
}

export default HomeSpentToday;
