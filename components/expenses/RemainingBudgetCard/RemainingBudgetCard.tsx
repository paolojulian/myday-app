import BentoCard from '@/components/common/BentoCard';
import PieChart from '@/components/common/PieChart';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import useBudget from '@/hooks/services/budget/useBudget';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { getTotalExpenseAmount } from '@/utils/expenses/getTotalExpenseAmount';
import { useMemo } from 'react';
import { NoBudgetCard } from './NoBudgetCard';
import { StyleSheet } from 'react-native';

type RemainingBudgetCardProps = {
  variant?: 'horizontal' | 'vertical';
};

export default function RemainingBudgetCard({ variant = 'vertical' }: RemainingBudgetCardProps) {
  const today = useMemo(() => new Date(), []);
  const { data: budget } = useBudget(today);
  const { data: expenses } = useExpenses({
    filterType: 'monthly',
    transactionDate: today,
  });

  const monthlyBudget = budget?.amount ?? 0;
  const totalMonthlyExpenses = useMemo(() => getTotalExpenseAmount(expenses), [expenses]);

  const remainingBudget = monthlyBudget - totalMonthlyExpenses;

  const variantStyles = variant === 'horizontal' ? horizontalStyles : verticalStyles;

  if (!budget) {
    return <NoBudgetCard />;
  }

  return (
    <BentoCard>
      <ThemedView
        style={{
          gap: 16,
          ...variantStyles.container,
        }}
      >
        <ThemedView style={{ marginTop: 16 }}>
          <PieChart current={remainingBudget} total={monthlyBudget} />
        </ThemedView>
        <Stack style={{ ...variantStyles.description }}>
          <ThemedText variant="heading">{toLocaleCurrencyFormat(remainingBudget)}</ThemedText>
          <ThemedText variant="body">Remaining Budget</ThemedText>
        </Stack>
      </ThemedView>
    </BentoCard>
  );
}

const horizontalStyles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  description: {
    alignItems: 'flex-start',
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
});
