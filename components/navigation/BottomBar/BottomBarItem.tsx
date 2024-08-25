import { selectionAsync } from 'expo-haptics';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export type BottomBarItemProps = {
  ActiveIcon: React.ReactElement;
  InactiveIcon: React.ReactElement;
  name: string;
  isActive: boolean;
  onPress: () => void;
  activeColor: string;
};

export default function BottomBarItem({
  ActiveIcon,
  InactiveIcon,
  isActive,
  onPress,
  activeColor,
}: BottomBarItemProps) {
  const handlePress = () => {
    if (!isActive) {
      onPress();
      selectionAsync();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isActive}
      style={{
        gap: 4,
        alignItems: 'center',
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingVertical: 16,
        position: 'relative',
      }}
    >
      {isActive ? (
        <View
          style={{
            backgroundColor: activeColor,
            height: 18,
            width: 2,
            borderRadius: 9999,
            position: 'absolute',
            bottom: 0,
            left: '48%',
            zIndex: 10,
          }}
        />
      ) : null}
      <View
        style={{
          backgroundColor: isActive ? activeColor : 'transparent',
          height: 32,
          width: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 9999,
        }}
      >
        {isActive ? ActiveIcon : InactiveIcon}
      </View>
    </TouchableOpacity>
  );
}
