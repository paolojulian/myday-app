import BentoCard from '@/components/common/BentoCard';
import Container from '@/components/common/Container';
import PieChart from '@/components/common/PieChart';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import useBudget from '@/hooks/services/budget/useBudget';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { getTotalExpenseAmount } from '@/utils/expenses/getTotalExpenseAmount';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Image } from 'react-native';

function BudgetOverview() {
  const today = useMemo(() => new Date(), []);
  const { data: budget } = useBudget(today);
  const { data: expenses } = useExpenses({
    filterType: 'monthly',
    transactionDate: today,
  });
  const monthlyBudget = budget?.amount ?? 0;
  const totalMonthlyExpenses = useMemo(() => getTotalExpenseAmount(expenses), [expenses]);
  const totalExpensesToday = useMemo(
    () =>
      getTotalExpenseAmount(
        expenses?.filter(expense => dayjs.unix(expense.transaction_date).isSame(today, 'day')),
      ),
    [expenses, today],
  );

  const remainingBudget = monthlyBudget - totalMonthlyExpenses;

  return (
    <Container style={{ flexDirection: 'row', gap: 8 }}>
      <BentoCard>
        <Stack style={{ gap: 16, alignItems: 'center', justifyContent: 'flex-end' }}>
          <ThemedView style={{ marginTop: 16 }}>
            <PieChart current={80} total={100} />
          </ThemedView>
          <Stack style={{ alignItems: 'center' }}>
            <ThemedText variant="heading">{toLocaleCurrencyFormat(remainingBudget)}</ThemedText>
            <ThemedText variant="body">Remaining Budget</ThemedText>
          </Stack>
        </Stack>
      </BentoCard>
      <BentoCard>
        <Stack style={{ gap: 16, alignItems: 'center', justifyContent: 'flex-end' }}>
          <ThemedView style={{ marginTop: 16 }}>
            <Image source={require('../../../assets/images/total-spent-today.png')} />
          </ThemedView>
          <Stack style={{ alignItems: 'center' }}>
            <ThemedText variant="heading" style={{ color: colors.red }}>
              -{toLocaleCurrencyFormat(totalExpensesToday)}
            </ThemedText>
            <ThemedText variant="body">Total Spent Today</ThemedText>
          </Stack>
        </Stack>
      </BentoCard>
    </Container>
  );
}

export default BudgetOverview;
