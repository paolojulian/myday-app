import { useMemo } from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

type Variants =
  | 'heading'
  | 'body'
  | 'body1'
  | 'body2'
  | 'large'
  | 'caps'
  | 'header-sm'
  | 'header-md'
  | 'header-lg'
  | 'body-md'
  | 'title-sm'
  | 'title-md'
  | 'title-lg';
type ThemedTextProps = {
  variant?: Variants;
} & TextProps;

export default function ThemedText({ variant = 'body', style, ...props }: ThemedTextProps) {
  const variantStyle = useMemo(() => {
    return variantStyles[variant] || variantStyles['body-md'];
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
    lineHeight: 32,
  },
  large: {
    fontSize: 48,
    fontWeight: 800,
    fontFamily: 'PoppinsBold',
    lineHeight: 56,
  },
  body: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    lineHeight: 20,
  },
  body1: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    lineHeight: 24,
  },
  body2: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'PoppinsMedium',
    lineHeight: 24,
  },
});

const variantStyles = StyleSheet.create<Record<Variants, TextStyle>>({
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
    lineHeight: 32,
  },
  large: {
    fontSize: 48,
    fontWeight: 800,
    fontFamily: 'PoppinsBold',
    lineHeight: 56,
  },
  body: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    lineHeight: 20,
  },
  body1: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    lineHeight: 24,
  },
  body2: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'PoppinsMedium',
    lineHeight: 24,
  },
  'body-md': {
    fontSize: 16,
    fontFamily: 'RalewayRegular',
  },
  'header-lg': {
    fontSize: 28,
    fontWeight: 700,
    fontFamily: 'RalewayBold',
  },
  'header-md': {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: 'RalewayBold',
  },
  'header-sm': {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'RalewayBold',
  },
  'title-lg': {
    fontSize: 28,
    fontWeight: 700,
    fontFamily: 'RalewayBold',
  },
  'title-md': {
    fontSize: 20,
    fontWeight: 400,
    fontFamily: 'RalewayRegular',
  },
  'title-sm': {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'RalewayRegular',
  },
});
