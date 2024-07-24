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
  'id' | 'title' | 'amount' | 'transaction_date' | 'category_name' | 'category_id' | 'recurrence'
>;

type ExpenseItemProps = {
  expense: SupportedExpenseFields;
};

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  const {
    id,
    title,
    amount,
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
          borderRadius: 8,
          elevation: 16,
          shadowColor: colors.black,
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          backgroundColor: colors.white,
        }}
      >
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
        <ThemedText variant="body2" style={{ color: colors.red }}>
          - {toLocaleCurrencyFormat(amount)}
        </ThemedText>
      </Row>
    </TouchableHighlight>
  );
}
