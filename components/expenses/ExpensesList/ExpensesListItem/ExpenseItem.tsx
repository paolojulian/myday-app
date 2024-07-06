import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { Expense, ExpenseWithCategoryName } from '@/hooks/services/expense/expense.types';
import { convertEpochToDate } from '@/utils/date/date.utils';
import { selectionAsync } from 'expo-haptics';
import { ComponentProps } from 'react';
import { TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import ExpenseItemRightActions from './ExpenseItemRightActions';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';

type SupportedExpenseFields = Pick<
  ExpenseWithCategoryName,
  'id' | 'title' | 'amount' | 'transaction_date' | 'category_name' | 'category_id'
>;

type ExpenseItemProps = {
  onDelete: (id: Expense['id']) => void;
  expense: SupportedExpenseFields;
};

export default function ExpenseItem({ onDelete, expense }: ExpenseItemProps) {
  const {
    id,
    title,
    amount,
    transaction_date: transactionDateEpoch,
    category_name: categoryName,
  } = expense;
  const formattedTransactionDate = convertEpochToDate(transactionDateEpoch).format('MMM D, YYYY');

  const handleDelete = () => {
    onDelete(id);
    selectionAsync();
  };

  const handlePress = () => {
    selectionAsync();
  };

  const renderRightActions: ComponentProps<typeof Swipeable>['renderRightActions'] = () => {
    return <ExpenseItemRightActions onDelete={handleDelete} />;
  };

  return (
    <Swipeable
      containerStyle={{
        borderRadius: 8,
        overflow: 'visible',
      }}
      renderRightActions={renderRightActions}
      overshootFriction={8}
      friction={2}
    >
      <TouchableHighlight
        style={{ borderRadius: 8 }}
        delayPressIn={400}
        onLongPress={handlePress}
        activeOpacity={0.9}
      >
        <Row
          style={{
            padding: 16,
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
            <ThemedText variant="body" style={{ color: colors.darkGrey }}>
              {formattedTransactionDate}
            </ThemedText>
          </Stack>
          <ThemedText variant="body2" style={{ color: colors.red }}>
            - {toLocaleCurrencyFormat(amount)}
          </ThemedText>
        </Row>
      </TouchableHighlight>
    </Swipeable>
  );
}
