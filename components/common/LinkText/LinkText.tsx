import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type LinkTextProps = {
  onPress?: () => void;
  text: string;
};

function LinkText({ onPress, text }: LinkTextProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedText variant="body2" style={{ color: colors.link }}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}

export default LinkText;
