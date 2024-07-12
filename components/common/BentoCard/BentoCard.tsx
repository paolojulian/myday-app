import { colors } from '@/constants/Colors';
import React, { ReactElement } from 'react';
import { View, ViewProps } from 'react-native';

type BentoCardProps = {
  children: ReactElement;
} & ViewProps;

function BentoCard({ children, style }: BentoCardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.slateGrey[100],
          borderColor: colors.slateGrey[200],
          borderRadius: 24,
          borderWidth: 1,
          flex: 1,
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default BentoCard;
