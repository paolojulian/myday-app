import { colors } from '@/constants/Colors';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

type BentoCardProps = {
  children: ReactElement;
};

function BentoCard({ children }: BentoCardProps) {
  return (
    <View
      style={{
        backgroundColor: colors.slateGrey[100],
        borderColor: colors.slateGrey[200],
        borderRadius: 24,
        borderWidth: 1,
        padding: 12,
      }}
    >
      {children}
    </View>
  );
}

export default BentoCard;
