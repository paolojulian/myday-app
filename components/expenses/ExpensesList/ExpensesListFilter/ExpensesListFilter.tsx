import Container from '@/components/common/Container';
import Tabs from '@/components/common/Tabs';
import { useState } from 'react';

export type SupportedExpenseFilter = 'item' | 'category';

type ExpensesListCategoriesProps = {
  onSelectFilter: (expenseFilter: SupportedExpenseFilter) => void;
};

export default function ExpensesListFilter({ onSelectFilter }: ExpensesListCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<SupportedExpenseFilter>('item');

  const handleSelectItem = (expenseFilter: SupportedExpenseFilter) => {
    onSelectFilter(expenseFilter);
    setSelectedCategory(expenseFilter);
  };

  return (
    <Container style={{ paddingVertical: 8 }}>
      <Tabs<SupportedExpenseFilter>
        items={[
          {
            key: 'item',
            value: 'Item',
          },
          {
            key: 'category',
            value: 'Category',
          },
        ]}
        onSelect={handleSelectItem}
        selectedItem={selectedCategory}
      ></Tabs>
    </Container>
  );
}
