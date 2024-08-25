import BentoCard from '@/components/common/BentoCard';
import LinkText from '@/components/common/LinkText';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { Image } from 'react-native';
import { UpdateBudgetManager } from '../UpdateBudgetBottomSheet/UpdateBudgetBottomSheet';

export function NoBudgetCard() {
  const handleSetBudgetPress = () => {
    UpdateBudgetManager.show();
  };

  return (
    <BentoCard>
      <Stack style={{ gap: 16, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ThemedView style={{ marginTop: 16 }}>
          <Image
            style={{ width: 64, height: 64 }}
            source={require('../../../assets/images/no-budget.png')}
          />
        </ThemedView>
        <ThemedText variant="body2">No Budget Set</ThemedText>
        <LinkText onPress={handleSetBudgetPress} text="Set Now" />
      </Stack>
    </BentoCard>
  );
}
