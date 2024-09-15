import Container from '@/components/common/Container';
import LinkText from '@/components/common/LinkText';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ExpenseItem from '@/components/expenses/ExpensesList/ExpensesListItem/ExpenseItem';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { Fragment } from 'react';
import EmptyRecentTransactions from './EmptyRecentTransactions';
import { TabName } from '@/utils/constants';

function RecentTransactions() {
  const navigation = useNavigation();
  const {
    data: expenses,
    isLoading,
    refetch: refetchExpenses,
  } = useExpenses({ filterType: 'recent-transactions' });

  useFocusEffect(() => {
    refetchExpenses();
  });

  const isEmpty = !expenses || expenses.length === 0;

  const handleViewAllPress = () => {
    navigation.navigate(TabName.Expense as never);
  };

  if (isLoading) {
    // TODO - add loader
    return null;
  }

  return (
    <Container>
      {/* Title */}
      <Stack style={{ gap: 8 }}>
        <ThemedText variant="header-md">Recent Transactions</ThemedText>
        {isEmpty ? <EmptyRecentTransactions /> : null}
        {!isEmpty && (
          <Fragment>
            {/* List */}
            <Stack>
              {expenses?.map(expense => <ExpenseItem key={expense.id} expense={expense} />)}
            </Stack>
            {/* View All */}
            <Row style={{ justifyContent: 'center' }}>
              <LinkText onPress={handleViewAllPress} text="View all" />
            </Row>
          </Fragment>
        )}
      </Stack>
    </Container>
  );
}

export default RecentTransactions;
