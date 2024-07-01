import { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type ThemedTextProps = {
  variant?: 'heading' | 'body' | 'body1' | 'body2';
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
  },
  heading: {
    fontSize: 32,
    fontWeight: 600,
    fontFamily: 'Open_SansSemiBold',
  },
  body: {
    fontSize: 14,
    fontFamily: 'Open_SansRegular',
  },
  body1: {
    fontSize: 16,
    fontFamily: 'Open_SansRegular',
  },
  body2: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Open_SansMedium',
  },
});
