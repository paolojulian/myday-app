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

export default function RemainingBudgetCard() {
  const today = useMemo(() => new Date(), []);
  const { data: budget } = useBudget(today);
  const { data: expenses } = useExpenses({
    filterType: 'monthly',
    transactionDate: today,
  });

  const monthlyBudget = budget?.amount ?? 0;
  const totalMonthlyExpenses = useMemo(() => getTotalExpenseAmount(expenses), [expenses]);

  const remainingBudget = monthlyBudget - totalMonthlyExpenses;

  if (!budget) {
    return <NoBudgetCard />;
  }

  return (
    <BentoCard>
      <Stack style={{ gap: 16, alignItems: 'center', justifyContent: 'flex-end' }}>
        <ThemedView style={{ marginTop: 16 }}>
          <PieChart current={remainingBudget} total={monthlyBudget} />
        </ThemedView>
        <Stack style={{ alignItems: 'center' }}>
          <ThemedText variant="heading">{toLocaleCurrencyFormat(remainingBudget)}</ThemedText>
          <ThemedText variant="body">Remaining Budget</ThemedText>
        </Stack>
      </Stack>
    </BentoCard>
  );
}
