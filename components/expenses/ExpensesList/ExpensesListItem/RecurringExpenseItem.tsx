import { RouteNames } from '@/app/_layout';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { ExpenseListItem } from '@/hooks/services/expense/expense.types';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { convertEpochToDate } from '@/utils/date/date.utils';
import { selectionAsync } from 'expo-haptics';
import { useRouter } from 'expo-router';
import { TouchableHighlight } from 'react-native';

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
  const {
    id,
    title,
    transaction_date: transactionDateEpoch,
    category_name: categoryName,
    recurrence,
  } = expense;
  const router = useRouter();
  const formattedTransactionDate = convertEpochToDate(transactionDateEpoch).format('MMM D, YYYY');
  const recurrenceText = recurrence !== null ? `${recurrence}` : '';

  const handlePress = () => {
    selectionAsync();
    router.push({
      pathname: RouteNames.Edit,
      params: { id },
    });
  };

  return (
    <TouchableHighlight
      style={{ borderRadius: 8 }}
      delayPressIn={400}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Row
        style={{
          padding: 16,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.slateGrey[200],
          borderRadius: 16,
          backgroundColor: colors.white,
        }}
      >
        <Stack style={{ width: '100%' }}>
          <Stack>
            <ThemedText variant="body2">{title}</ThemedText>
            {!!categoryName && (
              <ThemedText variant="body" style={{ color: colors.darkGrey }}>
                {categoryName}
              </ThemedText>
            )}
            <ThemedText
              variant="body"
              style={{ color: colors.darkGrey, textTransform: 'capitalize' }}
            >
              {recurrence !== null ? recurrenceText : formattedTransactionDate}
            </ThemedText>
          </Stack>
          <Stack style={{ paddingLeft: 16 }}>
            {expense.recurred_items.map(recurredItem => (
              <Row key={recurredItem.id} style={{ justifyContent: 'space-between' }}>
                <ThemedText style={{ color: colors.darkGrey }}>
                  {convertEpochToDate(recurredItem.transaction_date).format('MMM D')}
                </ThemedText>
                <ThemedText style={{ color: colors.red }}>
                  - {toLocaleCurrencyFormat(recurredItem.amount)}
                </ThemedText>
              </Row>
            ))}
          </Stack>

          {/* Total */}
          {expense.recurred_items.length > 1 && (
            <Stack style={{ marginTop: 16 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <ThemedText style={{ color: colors.darkGrey }}>Total</ThemedText>
                <ThemedText style={{ color: colors.red }}>
                  - {toLocaleCurrencyFormat(expense.amount)}
                </ThemedText>
              </Row>
            </Stack>
          )}
        </Stack>
      </Row>
    </TouchableHighlight>
  );
}
