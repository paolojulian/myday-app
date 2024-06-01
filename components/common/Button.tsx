import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonVariants = 'primary';

type ButtonProps = {
  text: string;
  variant?: ButtonVariants;
} & TouchableOpacityProps;

function Button({ text, variant = 'primary', ...props }: ButtonProps) {
  const containerVariantStyle = useMemo(() => {
    switch (variant) {
      case 'primary':
        return styles.primaryContainer;
      default:
        return {};
    }
  }, [variant]);

  const textVariantStyle = useMemo(() => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      default:
        return {};
    }
  }, [variant]);

  return (
    <TouchableOpacity activeOpacity={0.9} {...props}>
      <ThemedView style={[styles.container, containerVariantStyle]}>
        <ThemedText style={[textVariantStyle]}>{text}</ThemedText>
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
  primaryContainer: {
    backgroundColor: colors.black,
  },
  primaryText: {
    color: colors.white,
  },
});

export default Button;
