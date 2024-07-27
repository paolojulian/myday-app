import { RouteNames } from '@/app/_layout';
import ThemedText from '@/components/common/ThemedText';
import { ExpenseListItem } from '@/hooks/services/expense/expense.types';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { convertEpochToDate } from '@/utils/date/date.utils';
import { selectionAsync } from 'expo-haptics';
import { useRouter } from 'expo-router';
import {
  StyledCategoryName,
  StyledRecurredPaymentsContainer,
  StyledRecurrenceItem,
  StyledRecurrenceType,
  StyledTotalAmount,
  StyledTouchableContainer,
} from './RecurringExpenseItem.style';

type SupportedExpenseFields = Pick<
  ExpenseListItem,
  | 'id'
  | 'title'
  | 'amount'
  | 'transaction_date'
  | 'category_name'
  | 'category_id'
  | 'recurrence'
  | 'recurred_items'
>;

type RecurringExpenseItemProps = {
  expense: SupportedExpenseFields;
};

export default function RecurringExpenseItem({ expense }: RecurringExpenseItemProps) {
  const { id, title, category_name: categoryName, recurrence } = expense;
  const router = useRouter();
  const recurrenceText: string = recurrence !== null ? `${recurrence}` : '';
  const shouldShowTotal: boolean = expense.recurred_items.length > 1;

  const handlePress = () => {
    selectionAsync();
    router.push({
      pathname: RouteNames.Edit,
      params: { id },
    });
  };

  return (
    <StyledTouchableContainer onPress={handlePress}>
      <ThemedText variant="body2">{title}</ThemedText>
      <StyledCategoryName categoryName={categoryName} />
      <StyledRecurrenceType title={recurrenceText} />

      <StyledRecurredPaymentsContainer>
        {expense.recurred_items.map(recurredItem => (
          <StyledRecurrenceItem
            key={recurredItem.id}
            transactionDate={convertEpochToDate(recurredItem.transaction_date).format('MMM D')}
            amount={`- ${toLocaleCurrencyFormat(recurredItem.amount)}`}
          />
        ))}
      </StyledRecurredPaymentsContainer>

      {/* Total */}
      {shouldShowTotal && (
        <StyledTotalAmount amount={`- ${toLocaleCurrencyFormat(expense.amount)}`} />
      )}
    </StyledTouchableContainer>
  );
}
