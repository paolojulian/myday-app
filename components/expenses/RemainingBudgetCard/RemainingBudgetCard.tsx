import AppCard from '@/components/common/AppCard';
import PieChart from '@/components/common/PieChart';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import useBudget from '@/hooks/services/budget/useBudget';
import { useTotalExpenses } from '@/hooks/services/expense/useTotalExpenses';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { useFocusEffect } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { UpdateBudgetManager } from '../UpdateBudgetBottomSheet/UpdateBudgetBottomSheet';
import { NoBudgetCard } from './NoBudgetCard';
import Row from '@/components/common/Row';

type RemainingBudgetCardProps = {
  variant?: 'horizontal' | 'vertical';
};

export default function RemainingBudgetCard({ variant = 'vertical' }: RemainingBudgetCardProps) {
  const today = useMemo(() => new Date(), []);
  const { data: budget, refetch: refetchBudget } = useBudget(today);
  const { data: totalMonthlyExpenses, refetch: refetchTotalExpenses } = useTotalExpenses({
    transactionDate: today,
    type: 'monthly',
  });

  const handlePress = () => {
    UpdateBudgetManager.show();
  };

  useFocusEffect(() => {
    refetchTotalExpenses();
    refetchBudget();
  });

  const monthlyBudget = budget?.amount ?? 0;

  const remainingBudget = monthlyBudget - totalMonthlyExpenses;

  const variantStyles = variant === 'horizontal' ? horizontalStyles : verticalStyles;
  const pieChartVariant = variant === 'horizontal' ? 'sm' : 'default';

  if (!budget) {
    return <NoBudgetCard />;
  }

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
      <AppCard
        style={{
          backgroundColor: colors.v2.teal,
        }}
      >
        <Row
          style={{
            gap: 16,
            ...variantStyles.container,
          }}
        >
          <Stack style={{ gap: 32 }}>
            <Stack style={{ ...variantStyles.description }}>
              <ThemedText variant="body-md" style={{ color: colors.v2.black }}>
                Remaining Budget
              </ThemedText>
              <ThemedText variant="header-lg" style={{ color: colors.v2.black }}>
                {toLocaleCurrencyFormat(remainingBudget)}
              </ThemedText>
            </Stack>
            <Stack style={{ ...variantStyles.description }}>
              <ThemedText variant="header-md" style={{ color: colors.v2.black }}>
                {toLocaleCurrencyFormat(monthlyBudget)}
              </ThemedText>
              <ThemedText variant="body-md" style={{ color: colors.v2.black }}>
                Monthly Budget
              </ThemedText>
            </Stack>
          </Stack>
          <ThemedView style={{ ...variantStyles.pieChart }}>
            <PieChart variant={pieChartVariant} current={remainingBudget} total={monthlyBudget} />
          </ThemedView>
        </Row>
      </AppCard>
    </TouchableOpacity>
  );
}

const horizontalStyles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    flexDirection: 'row-reverse',
    padding: 24,
  },
  description: {
    alignItems: 'flex-start',
  },
  pieChart: {
    marginTop: 0,
  },
});

const verticalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  description: {
    alignItems: 'center',
  },
  pieChart: {
    marginTop: 16,
  },
});
