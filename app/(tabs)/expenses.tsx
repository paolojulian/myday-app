import Container from '@/components/common/Container';
import ParallaxScrollView, { HEADER_HEIGHT } from '@/components/common/ParallaxScrollView';
import Tabs from '@/components/common/Tabs';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import ExpensesList from '@/components/expenses/ExpensesList';
import ExpensesListHeader from '@/components/expenses/ExpensesList/ExpensesListHeader/ExpensesListHeader';
import ExpensesStatistics from '@/components/expenses/ExpensesStatistics';
import { colors } from '@/constants/Colors';
import { useState } from 'react';

export default function ExpensesScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ParallaxScrollView headerBackgroundColor={colors.black} headerContent={<ExpensesListHeader />}>
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
          <Tabs
            items={['Daily', 'Monthly', 'Yearly']}
            onSelect={() => {}}
            selectedItem="Daily"
            variant="inverted"
          />
          <ExpensesStatistics selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </Container>
        <ExpensesList />
      </ThemedView>
    </ParallaxScrollView>
  );
}
