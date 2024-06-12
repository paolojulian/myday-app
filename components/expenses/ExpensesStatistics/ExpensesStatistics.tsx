import Card from '@/components/common/Card';
import DatePicker from '@/components/common/forms/DatePicker';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { ExpenseFilterEnum } from '@/hooks/services/expense/expense.types';
import React from 'react';

type ExpensesStatisticsProps = {
  variant?: ExpenseFilterEnum;
  selectedDate: Date;
  onSelectDate?: (date: Date) => void;
};

function ExpensesStatistics({
  onSelectDate,
  variant = ExpenseFilterEnum.daily,
  selectedDate,
}: ExpensesStatisticsProps) {
  if (variant === ExpenseFilterEnum.daily) {
    return (
      <DatePicker
        canShrink={false}
        value={selectedDate}
        initialIsExpanded={true}
        variant="shadow"
        onSelectDate={onSelectDate}
      />
    );
  }

  return (
    <Card
      variant="shadow"
      HeaderContent={
        <ThemedView>
          <ThemedText>Monthly expenses</ThemedText>
        </ThemedView>
      }
    >
      <ThemedView style={{ minHeight: 200 }}></ThemedView>
    </Card>
  );
}

export const EXPENSES_STATISTICS_VARIANTS: ExpenseFilterEnum[] = [
  ExpenseFilterEnum.daily,
  ExpenseFilterEnum.monthly,
  ExpenseFilterEnum.yearly,
];

export default ExpensesStatistics;
