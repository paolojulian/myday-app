import { colors } from '@/constants/Colors';
import useBudget from '@/hooks/services/budget/useBudget';
import { useTotalExpenses } from '@/hooks/services/expense/useTotalExpenses';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { useFocusEffect } from 'expo-router';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import AppCard from '../common/AppCard';
import PieChart from '../common/PieChart';
import Stack from '../common/Stack';
import ThemedText from '../common/ThemedText';

function HomeRemainingBudgetCard() {
  const transactionDate = useMemo(() => new Date(), []);
  const { data: budget, refetch: refetchBudget } = useBudget(transactionDate);
  const { data: totalMonthlyExpenses, refetch: refetchTotalExpenses } = useTotalExpenses({
    transactionDate,
    type: 'monthly',
  });

  useFocusEffect(() => {
    refetchTotalExpenses();
    refetchBudget();
  });

  const monthlyBudget = budget?.amount ?? 0;
  const remainingBudget = monthlyBudget - totalMonthlyExpenses;

  return (
    <AppCard
      style={{
        backgroundColor: colors.v2.teal,
        height: 197,
      }}
    >
      <Stack style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <View style={{ marginBottom: 16 }}>
          <PieChart current={remainingBudget} total={monthlyBudget} variant="sm" />
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <ThemedText variant="header-lg" color="inverted">
            {toLocaleCurrencyFormat(remainingBudget)}
          </ThemedText>
          <ThemedText variant="title-sm" color="inverted">
            Remaining Budget
          </ThemedText>
        </View>
      </Stack>
    </AppCard>
  );
}

export default HomeRemainingBudgetCard;
