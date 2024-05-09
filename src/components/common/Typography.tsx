import { ComponentProps, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

type TypographyProps = {
  variant?: 'heading' | 'body';
} & ComponentProps<typeof Text>;

export default function Typography({ variant = 'body', ...props }: TypographyProps) {
  const variantStyle = useMemo(() => {
    if (variant === 'heading') {
      return styles.heading;
    }
    return styles.body;
  }, [variant]);

  return <Text {...props} style={[variantStyle]}></Text>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
  },
  body: {
    fontSize: 16,
  },
});
