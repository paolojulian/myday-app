import Container from '@/components/common/Container';
import { ExpenseFlatListItems } from './ExpenseList.types';
import { isCategory, isFilter } from './ExpensesList.utils';
import ExpensesListFilter from './ExpensesListFilter';
import CategoryItem from './CategoryItem';
import ExpenseItemFactory from './ExpensesListItem/ExpenseItemFactory';
import { SupportedExpenseFilter } from './ExpensesListFilter/ExpensesListFilter';

type ExpenseListRenderItemsProps = {
  onSelectFilter: (expenseFilter: SupportedExpenseFilter) => void;
  item: ExpenseFlatListItems;
  selectedFilter: SupportedExpenseFilter;
  totalExpensesAmount: number;
};
export default function ExpenseListRenderItems({
  onSelectFilter,
  item,
  selectedFilter,
  totalExpensesAmount,
}: ExpenseListRenderItemsProps) {
  if (isFilter(item)) {
    return <ExpensesListFilter selectedFilter={selectedFilter} onSelectFilter={onSelectFilter} />;
  }

  return (
    <Container>
      {isCategory(item) ? (
        <CategoryItem key={item.categoryId} item={item} totalExpensesAmount={totalExpensesAmount} />
      ) : (
        <ExpenseItemFactory key={item.id} expense={item} />
      )}
    </Container>
  );
}
