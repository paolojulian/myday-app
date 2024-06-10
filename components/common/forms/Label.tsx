import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';

type LabelProps = {
  text: string;
};

function Label({ text }: LabelProps) {
  return <ThemedText style={{ color: colors.black, fontWeight: '500' }}>{text}</ThemedText>;
}

export default Label;
