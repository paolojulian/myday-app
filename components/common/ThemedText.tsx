import { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type ThemedText = {
  variant?: 'heading' | 'body' | 'body-lg';
} & TextProps;

export default function ThemedText({ variant = 'body', ...props }: ThemedText) {
  const variantStyle = useMemo(() => {
    return styles[variant] || styles.body;
  }, [variant]);

  return <Text {...props} style={[variantStyle, styles.baseStyle]}></Text>;
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
  ['body-lg']: {
    fontSize: 24,
    fontWeight: '500',
  },
});
