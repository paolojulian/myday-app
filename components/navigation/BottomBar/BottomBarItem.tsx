import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

export type BottomBarItemProps = {
  ActiveIcon: React.ReactElement;
  InactiveIcon: React.ReactElement;
  name: string;
  isActive: boolean;
  onPress: () => void;
};

export default function BottomBarItem({
  ActiveIcon,
  InactiveIcon,
  isActive,
  name,
  onPress,
}: BottomBarItemProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ThemedView style={{ gap: 4, alignItems: 'center' }}>
        {isActive ? ActiveIcon : InactiveIcon}
        <ThemedText
          style={{
            color: isActive ? colors.black : colors.darkGrey,
          }}
          variant="small"
        >
          {name}
        </ThemedText>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
