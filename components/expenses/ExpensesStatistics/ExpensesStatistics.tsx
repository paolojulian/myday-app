import Card from '@/components/common/Card';
import DatePicker from '@/components/common/forms/DatePicker';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import React from 'react';

type ExpensesStatisticsVariant = 'daily' | 'monthly' | 'yearly';
type ExpensesStatisticsProps = {
  variant?: ExpensesStatisticsVariant;
  selectedDate: Date;
  onSelectDate?: (date: Date) => void;
};

function ExpensesStatistics({
  onSelectDate,
  variant = 'daily',
  selectedDate,
}: ExpensesStatisticsProps) {
  if (variant === 'daily') {
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

export default ExpensesStatistics;
