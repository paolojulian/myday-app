import { TabName } from '@/app/(tabs)/_layout';
import BentoCard from '@/components/common/BentoCard';
import Container from '@/components/common/Container';
import LinkText from '@/components/common/LinkText';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ExpenseItem from '@/components/expenses/ExpensesList/ExpensesListItem/ExpenseItem';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { useNavigation } from 'expo-router';
import React from 'react';

function RecentTransactions() {
  const navigation = useNavigation();
  const { data: expenses } = useExpenses({ filterType: 'recent-transactions' });
  const handleViewAllPress = () => {
    navigation.navigate(TabName.Expense as never);
  };
  const handleDeleteExpense = () => {};

  return (
    <Container>
      <BentoCard>
        {/* Title */}
        <Stack style={{ gap: 16 }}>
          <ThemedText variant="body2">Recent Transactions</ThemedText>
          {/* List */}
          <Stack style={{ gap: 8 }}>
            {expenses?.map(expense => (
              <ExpenseItem key={expense.id} onDelete={handleDeleteExpense} expense={expense} />
            ))}
          </Stack>
          {/* View All */}
          <Row style={{ justifyContent: 'center' }}>
            <LinkText onPress={handleViewAllPress} text="View all" />
          </Row>
        </Stack>
      </BentoCard>
    </Container>
  );
}

export default RecentTransactions;
