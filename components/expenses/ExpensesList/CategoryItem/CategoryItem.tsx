import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { TouchableHighlight } from 'react-native';
import { CategoryItemFields } from '../ExpensesList.utils';

type CategoryItemProps = {
  item: CategoryItemFields;
  totalExpensesAmount: number;
};

export default function CategoryItem({ item, totalExpensesAmount }: CategoryItemProps) {
  const percentage = (item.totalAmount / totalExpensesAmount) * 100;
  return (
    <TouchableHighlight
      style={{ borderRadius: 8 }}
      delayPressIn={400}
      // onPress={handlePress}
      activeOpacity={0.9}
    >
      <Row
        style={{
          alignItems: 'center',
          backgroundColor: colors.white,
          borderRadius: 24,
          justifyContent: 'space-between',
          padding: 16,
          borderWidth: 1,
          borderColor: colors.slateGrey[200],
        }}
      >
        <Stack>
          <ThemedText variant="body2">{item.categoryName}</ThemedText>
        </Stack>
        <ThemedText variant="heading">{percentage.toFixed(0)}%</ThemedText>
      </Row>
    </TouchableHighlight>
  );
}
