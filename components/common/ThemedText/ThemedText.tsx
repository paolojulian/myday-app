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
  heading: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: 'LivvicSemiBold',
  },
  body: {
    fontSize: 14,
    fontFamily: 'LivvicRegular',
  },
  body1: {
    fontSize: 16,
    fontFamily: 'LivvicRegular',
  },
  body2: {
    fontSize: 16,
    fontFamily: 'LivvicMedium',
  },
});
