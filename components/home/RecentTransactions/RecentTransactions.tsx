import BentoCard from '@/components/common/BentoCard';
import Container from '@/components/common/Container';
import LinkText from '@/components/common/LinkText';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ExpenseItem from '@/components/expenses/ExpensesList/ExpensesListItem/ExpenseItem';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import dayjs from 'dayjs';
import React from 'react';

function RecentTransactions() {
  const handleViewAllPress = () => {};
  const handleDeleteExpense = () => {};

  return (
    <Container>
      <BentoCard>
        {/* Title */}
        <Stack style={{ gap: 16 }}>
          <ThemedText variant="body2">Recent Transactions</ThemedText>
          {/* List */}
          <Stack style={{ gap: 8 }}>
            <ExpenseItem
              onDelete={handleDeleteExpense}
              expense={{
                id: 1,
                title: 'Test',
                amount: 100,
                transaction_date: convertDateToEpoch(dayjs().toDate()),
                category_id: null,
                category_name: null,
              }}
            />
            <ExpenseItem
              onDelete={handleDeleteExpense}
              expense={{
                id: 1,
                title: 'Test',
                amount: 100,
                transaction_date: convertDateToEpoch(dayjs().toDate()),
                category_id: null,
                category_name: null,
              }}
            />
            <ExpenseItem
              onDelete={handleDeleteExpense}
              expense={{
                id: 1,
                title: 'Test',
                amount: 100,
                transaction_date: convertDateToEpoch(dayjs().toDate()),
                category_id: null,
                category_name: null,
              }}
            />
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
