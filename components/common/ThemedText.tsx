import { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type ThemedTextProps = {
  variant?: 'heading' | 'body' | 'body2' | 'body-lg' | 'small';
} & TextProps;

export default function ThemedText({ variant = 'body', style, ...props }: ThemedTextProps) {
  const variantStyle = useMemo(() => {
    return styles[variant] || styles.body;
  }, [variant]);

  return <Text {...props} style={[style, variantStyle, styles.baseStyle]}></Text>;
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
  body2: {
    fontSize: 20,
  },
  small: {
    fontSize: 12,
  },
  ['body-lg']: {
    fontSize: 24,
    fontWeight: '500',
  },
});
