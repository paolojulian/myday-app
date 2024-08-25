import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';

type LabelProps = {
  text: string;
};

function Label({ text }: LabelProps) {
  return (
    <ThemedText aria-label={text} variant="header-sm" style={{ color: colors.v2.white }}>
      {text}
    </ThemedText>
  );
}

export default Label;
