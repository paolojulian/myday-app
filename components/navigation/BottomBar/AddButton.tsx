import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { selectionAsync } from 'expo-haptics';
import { ComponentProps } from 'react';
import { TouchableOpacity, View } from 'react-native';

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
          backgroundColor: colors.slateGrey[200],
          borderWidth: 1,
          borderColor: colors.slateGrey[300],
          width: 64,
          height: 64,
          padding: 8,
          borderRadius: 9999,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: colors.black,
            width: 48,
            height: 48,
            borderRadius: 9999,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="add-outline" color={colors.white} size={32} />
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}
