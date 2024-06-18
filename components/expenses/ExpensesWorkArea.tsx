import Container from '@/components/common/Container';
import ParallaxScrollView, { HEADER_HEIGHT } from '@/components/common/ParallaxScrollView';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import BudgetCard from '@/components/expenses/BudgetCard';
import BudgetModal from '@/components/expenses/BudgetCard/BudgetModal';
import ExpensesList from '@/components/expenses/ExpensesList';
import ExpensesListHeader from '@/components/expenses/ExpensesList/ExpensesListHeader/ExpensesListHeader';
import ExpensesStatistics from '@/components/expenses/ExpensesStatistics/ExpensesStatistics';
import { colors } from '@/constants/Colors';
import { ExpenseFilterEnum } from '@/hooks/services/expense/expense.types';
import ModalProvider, { ModalTypes } from '@/providers/ModalProvider';
import React, { useState } from 'react';

function ExpensesWorkArea() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ModalProvider
      modals={[
        {
          element: <BudgetModal />,
          type: ModalTypes.updateBudgetModal,
        },
      ]}
    >
      <ParallaxScrollView
        headerBackgroundColor={colors.black}
        headerContent={<ExpensesListHeader />}
      >
        <ThemedView
          style={{
            marginTop: -HEADER_HEIGHT + 24,
            gap: 32,
          }}
        >
          <Container style={{ gap: 24 }}>
            <ThemedText variant="heading" style={{ color: colors.white }}>
              Monthly Expenses
            </ThemedText>
            <ExpensesStatistics
              selectedDate={selectedDate}
              variant={ExpenseFilterEnum.monthly}
              onSelectDate={setSelectedDate}
            />
            <BudgetCard />
          </Container>
          <ExpensesList filterType={ExpenseFilterEnum.monthly} transactionDate={selectedDate} />
        </ThemedView>
      </ParallaxScrollView>
    </ModalProvider>
  );
}

export default ExpensesWorkArea;
