import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';

type LabelProps = {
  text: string;
};

function Label({ text }: LabelProps) {
  return (
    <ThemedText aria-label={text} variant="body2" style={{ color: colors.black }}>
      {text}
    </ThemedText>
  );
}

export default Label;
