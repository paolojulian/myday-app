import Container from '@/components/common/Container';
import ParallaxScrollView, { HEADER_HEIGHT } from '@/components/common/ParallaxScrollView';
import Tabs from '@/components/common/Tabs';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import BudgetCard from '@/components/expenses/BudgetCard';
import BudgetModal from '@/components/expenses/BudgetCard/BudgetModal';
import ExpensesList from '@/components/expenses/ExpensesList';
import ExpensesListHeader from '@/components/expenses/ExpensesList/ExpensesListHeader/ExpensesListHeader';
import ExpensesStatistics from '@/components/expenses/ExpensesStatistics';
import {
  EXPENSES_STATISTICS_VARIANTS,
  ExpensesStatisticsVariantEnum,
} from '@/components/expenses/ExpensesStatistics/ExpensesStatistics';
import { colors } from '@/constants/Colors';
import ModalProvider, { ModalTypes } from '@/providers/ModalProvider';
import { useState } from 'react';

export default function ExpensesScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState<ExpensesStatisticsVariantEnum>(
    ExpensesStatisticsVariantEnum.daily,
  );

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
          <Container style={{ gap: 32 }}>
            <ThemedText variant="heading" style={{ color: colors.white }}>
              Expenses
            </ThemedText>
            <Tabs<ExpensesStatisticsVariantEnum>
              items={EXPENSES_STATISTICS_VARIANTS}
              onSelect={setFilter}
              selectedItem={filter}
              variant="inverted"
              isCompact
            />
            <ExpensesStatistics
              selectedDate={selectedDate}
              variant={filter}
              onSelectDate={setSelectedDate}
            />
            <BudgetCard />
          </Container>
          <ExpensesList />
        </ThemedView>
      </ParallaxScrollView>
    </ModalProvider>
  );
}
