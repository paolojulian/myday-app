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
      pathname: RouteNames.Edit as never,
      params: { id },
    });
  };

  return (
    <TouchableHighlight
      style={{ borderRadius: 16 }}
      delayPressIn={400}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Row
        style={{
          paddingVertical: 16,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack>
          <ThemedText variant="header-sm">{title}</ThemedText>
          {!!categoryName && (
            <ThemedText variant="body-md" style={{ color: colors.v2.grayLight }}>
              {categoryName}
            </ThemedText>
          )}
          <ThemedText
            variant="body-md"
            style={{ color: colors.v2.grayLight, textTransform: 'capitalize' }}
          >
            {recurrence !== null ? recurrenceText : formattedTransactionDate}
          </ThemedText>
        </Stack>
        <ThemedText variant="header-md" style={{ color: colors.v2.teal }}>
          - {toLocaleCurrencyFormat(amount)}
        </ThemedText>
      </Row>
    </TouchableHighlight>
  );
}
