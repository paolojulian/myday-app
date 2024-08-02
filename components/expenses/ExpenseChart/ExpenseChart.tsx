import Container from '@/components/common/Container';
import React from 'react';
import { ScrollView } from 'react-native';
import ExpenseChartItem from './ExpenseChartItem';

// const mockData = [
//   {
//     date: 1614556800,
//     amount: 15000,
//   },
//   {
//     date: 1617235200,
//     amount: 15000,
//   },
//   {
//     date: 1619827200,
//     amount: 15000,
//   },
//   {
//     date: 1622505600,
//     amount: 15000,
//   },
//   {
//     date: 1625097600,
//     amount: 150000,
//   },
//   {
//     date: 1627776000,
//     amount: 18000,
//   },
// ];
function ExpenseChart() {
  return (
    <ScrollView
      style={{
        paddingVertical: 16,
        direction: 'rtl',
      }}
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      horizontal
    >
      <Container style={{ flexDirection: 'row-reverse' }}>
        <ExpenseChartItem title="Mar" amount={15000} />
        <ExpenseChartItem title="Apr" amount={15000} />
        <ExpenseChartItem title="May" amount={15000} />
        <ExpenseChartItem title="Jun" amount={15000} />
        <ExpenseChartItem title="Jul" amount={150000} />
        <ExpenseChartItem isCurrent title="Aug" amount={18000} />
      </Container>
    </ScrollView>
  );
}

export default ExpenseChart;
