import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity } from 'react-native';

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
    <TouchableOpacity
      onPress={onPress}
      style={{ gap: 4, alignItems: 'center', flex: 1 }}
      activeOpacity={isActive ? 1 : 0.1}
    >
      {isActive ? ActiveIcon : InactiveIcon}
      <ThemedText
        style={{
          color: isActive ? colors.black : colors.darkGrey,
        }}
        variant="small"
      >
        {name}
      </ThemedText>
    </TouchableOpacity>
  );
}
