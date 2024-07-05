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
import React, { Fragment } from 'react';
import EmptyRecentTransactions from './EmptyRecentTransactions';

function RecentTransactions() {
  const navigation = useNavigation();
  const { data: expenses, isLoading } = useExpenses({ filterType: 'recent-transactions' });

  const isEmpty = !expenses || expenses.length === 0;

  const handleViewAllPress = () => {
    navigation.navigate(TabName.Expense as never);
  };

  const handleDeleteExpense = () => {};

  if (isLoading) {
    // TODO - add loader
    return null;
  }

  return (
    <Container>
      <BentoCard>
        {/* Title */}
        <Stack style={{ gap: 16 }}>
          <ThemedText variant="body2">Recent Transactions</ThemedText>
          {isEmpty ? <EmptyRecentTransactions /> : null}
          {!isEmpty && (
            <Fragment>
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
            </Fragment>
          )}
        </Stack>
      </BentoCard>
    </Container>
  );
}

export default RecentTransactions;
