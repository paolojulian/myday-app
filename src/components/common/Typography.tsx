import { ComponentProps, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

type TypographyProps = {
  variant?: 'heading' | 'body' | 'body-lg';
} & ComponentProps<typeof Text>;

export default function Typography({
  variant = 'body',
  ...props
}: TypographyProps) {
  const variantStyle = useMemo(() => {
    return styles[variant] || styles.body;
  }, [variant]);

  return <Text {...props} style={[variantStyle]}></Text>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
  },
  body: {
    fontSize: 16,
  },
  ['body-lg']: {
    fontSize: 24,
  },
});
