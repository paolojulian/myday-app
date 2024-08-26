import AppCard from '@/components/common/AppCard';
import LinkText from '@/components/common/LinkText';
import Stack from '@/components/common/Stack';
import { colors } from '@/constants/Colors';
import { UpdateBudgetManager } from '../UpdateBudgetBottomSheet/UpdateBudgetBottomSheet';
import { TouchableOpacity } from 'react-native';

export function NoBudgetCard() {
  const handleSetBudgetPress = () => {
    UpdateBudgetManager.show();
  };

  return (
    <TouchableOpacity onPress={handleSetBudgetPress}>
      <AppCard style={{ backgroundColor: colors.v2.grayDark }}>
        <Stack
          style={{
            paddingVertical: 16,
            gap: 16,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <LinkText text="Set Monthly Budget" style={{ color: colors.v2.teal }} />
        </Stack>
      </AppCard>
    </TouchableOpacity>
  );
}
