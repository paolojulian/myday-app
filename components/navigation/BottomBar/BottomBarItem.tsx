import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { selectionAsync } from 'expo-haptics';
import React from 'react';
import { TouchableHighlight } from 'react-native';

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
  const handlePress = () => {
    if (!isActive) {
      onPress();
      selectionAsync();
    }
  };

  return (
    <TouchableHighlight
      onPress={handlePress}
      disabled={isActive}
      style={{
        gap: 4,
        alignItems: 'center',
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingVertical: 16,
      }}
      underlayColor={colors.whiteSmoke}
    >
      <>
        {isActive ? ActiveIcon : InactiveIcon}
        <ThemedText
          style={{
            color: isActive ? colors.black : colors.darkGrey,
          }}
        >
          {name}
        </ThemedText>
      </>
    </TouchableHighlight>
  );
}
