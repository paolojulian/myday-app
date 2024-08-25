import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { selectionAsync } from 'expo-haptics';
import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

export type AddButtonProps = {
  onPress: () => void;
};

export default function AddButton({ onPress: onAddPress }: AddButtonProps) {
  const handlePress: ComponentProps<typeof TouchableOpacity>['onPress'] = e => {
    e.preventDefault();
    onAddPress();
    selectionAsync();
  };

  return (
    <ThemedView style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: colors.v2.black,
          borderWidth: 1,
          borderColor: colors.v2.white,
          width: 44,
          height: 44,
          padding: 4,
          borderRadius: 9999,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="add-outline" color={colors.v2.white} size={32} />
      </TouchableOpacity>
    </ThemedView>
  );
}
