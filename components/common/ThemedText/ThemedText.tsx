import { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type ThemedTextProps = {
  variant?: 'heading' | 'body' | 'body1' | 'body2' | 'large' | 'caps';
} & TextProps;

export default function ThemedText({ variant = 'body', style, ...props }: ThemedTextProps) {
  const variantStyle = useMemo(() => {
    return themedTextStyles[variant] || themedTextStyles.body;
  }, [variant]);

  return <Text {...props} style={[variantStyle, themedTextStyles.baseStyle, style]}></Text>;
}

export const themedTextStyles = StyleSheet.create({
  baseStyle: {
    fontWeight: 400,
  },
  caps: {
    fontSize: 64,
    fontWeight: 800,
    fontFamily: 'Barlow_CondensedBold',
    lineHeight: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: 600,
    fontFamily: 'PoppinsSemiBold',
  },
  large: {
    fontSize: 48,
    fontWeight: 800,
    fontFamily: 'PoppinsBold',
  },
  body: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
  },
  body1: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
  },
  body2: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'PoppinsMedium',
  },
});
