import Card from '@/components/common/Card';
import DatePicker from '@/components/common/forms/DatePicker';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import React from 'react';

export enum ExpensesStatisticsVariantEnum {
  daily = 'Daily',
  monthly = 'Monthly',
  yearly = 'Yearly',
}
type ExpensesStatisticsProps = {
  variant?: ExpensesStatisticsVariantEnum;
  selectedDate: Date;
  onSelectDate?: (date: Date) => void;
};

function ExpensesStatistics({
  onSelectDate,
  variant = ExpensesStatisticsVariantEnum.daily,
  selectedDate,
}: ExpensesStatisticsProps) {
  if (variant === ExpensesStatisticsVariantEnum.daily) {
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

export const EXPENSES_STATISTICS_VARIANTS: ExpensesStatisticsVariantEnum[] = [
  ExpensesStatisticsVariantEnum.daily,
  ExpensesStatisticsVariantEnum.monthly,
  ExpensesStatisticsVariantEnum.yearly,
];

export default ExpensesStatistics;
