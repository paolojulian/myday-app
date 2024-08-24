import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { TouchableHighlight } from 'react-native';
import { CategoryItemFields } from '../ExpensesList.utils';
import { colors } from '@/constants/Colors';

type CategoryItemProps = {
  item: CategoryItemFields;
  totalExpensesAmount: number;
};

export default function CategoryItem({ item, totalExpensesAmount }: CategoryItemProps) {
  const percentage = (item.totalAmount / totalExpensesAmount) * 100;
  return (
    <TouchableHighlight
      delayPressIn={400}
      // onPress={handlePress}
      activeOpacity={0.9}
    >
      <Row
        style={{
          alignItems: 'center',
          borderRadius: 24,
          justifyContent: 'space-between',
          padding: 8,
        }}
      >
        <Stack>
          <ThemedText variant="header-sm">{item.categoryName}</ThemedText>
        </Stack>
        <ThemedText variant="header-lg" style={{ color: colors.v2.accent }}>
          {percentage.toFixed(0)}%
        </ThemedText>
      </Row>
    </TouchableHighlight>
  );
}
