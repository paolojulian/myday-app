import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';
import { TextStyle, TouchableOpacity } from 'react-native';

type LinkTextProps = {
  onPress?: () => void;
  text: string;
  style?: TextStyle;
};

function LinkText({ onPress, text, style }: LinkTextProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedText variant="header-sm" style={{ color: colors.v2.teal, ...style }}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}

export default LinkText;
