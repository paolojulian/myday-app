import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonVariants = 'teal' | 'yellow';

type ButtonProps = {
  text: string;
  variant?: ButtonVariants;
  isLoading?: boolean;
} & TouchableOpacityProps;

function Button({ text, variant = 'teal', isLoading = false, ...props }: ButtonProps) {
  const containerVariantStyle = useMemo(() => {
    switch (variant) {
      case 'teal':
        return styles.tealContainer;
      case 'yellow':
        return styles.yellowContainer;
      default:
        return {};
    }
  }, [variant]);

  const textVariantStyle = useMemo(() => {
    switch (variant) {
      case 'teal':
        return styles.primaryText;
      case 'yellow':
        return styles.yellowText;
      default:
        return {};
    }
  }, [variant]);

  return (
    <TouchableOpacity
      role="button"
      accessibilityRole="button"
      activeOpacity={0.9}
      disabled={isLoading}
      {...props}
    >
      <ThemedView style={[styles.container, containerVariantStyle]}>
        <ThemedText variant="header-sm" style={[textVariantStyle, styles.text]}>
          {text}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tealContainer: {
    backgroundColor: colors.v2.teal,
  },
  yellowContainer: {
    backgroundColor: colors.v2.yellow,
  },
  primaryText: {
    color: colors.v2.black,
  },
  yellowText: {
    color: colors.v2.black,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Button;
