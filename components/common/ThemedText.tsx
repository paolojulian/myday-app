import { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type ThemedTextProps = {
  variant?: 'heading' | 'body' | 'body1' | 'body2' | 'small';
} & TextProps;

export default function ThemedText({ variant = 'body', style, ...props }: ThemedTextProps) {
  const variantStyle = useMemo(() => {
    return styles[variant] || styles.body;
  }, [variant]);

  return <Text {...props} style={[variantStyle, styles.baseStyle, style]}></Text>;
}

const styles = StyleSheet.create({
  baseStyle: {
    fontFamily: 'Inter',
  },
  heading: {
    fontSize: 48,
  },
  body: {
    fontSize: 16,
  },
  body1: {
    fontSize: 20,
  },
  small: {
    fontSize: 12,
  },
  body2: {
    fontSize: 20,
    fontWeight: '600',
  },
});
