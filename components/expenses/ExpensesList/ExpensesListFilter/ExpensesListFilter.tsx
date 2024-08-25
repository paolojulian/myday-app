import Container from '@/components/common/Container';
import Tabs from '@/components/common/Tabs';
import { colors } from '@/constants/Colors';

export type SupportedExpenseFilter = 'item' | 'category';

type ExpensesListCategoriesProps = {
  selectedFilter: SupportedExpenseFilter;
  onSelectFilter: (expenseFilter: SupportedExpenseFilter) => void;
};

export default function ExpensesListFilter({
  selectedFilter,
  onSelectFilter,
}: ExpensesListCategoriesProps) {
  const handleSelectItem = (expenseFilter: SupportedExpenseFilter) => {
    onSelectFilter(expenseFilter);
  };

  return (
    <Container style={{ paddingVertical: 8, backgroundColor: colors.v2.black }}>
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
        selectedItem={selectedFilter}
      ></Tabs>
    </Container>
  );
}
