import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';

type CardVariant = 'shadow' | 'border';
export type CardProps = {
  variant?: CardVariant;
  children?: React.ReactNode;
  HeaderContent?: React.ReactNode;
};

function Card({ variant = 'border', children, HeaderContent }: CardProps) {
  const resolvedStyles = variant === 'shadow' ? shadowStyles : borderStyles;
  return (
    <ThemedView style={[styles.container, resolvedStyles.container]}>
      <ThemedView style={styles.header}>{HeaderContent}</ThemedView>
      <ThemedView style={styles.body}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    backgroundColor: colors.v2.whiteSmoke,
    paddingVertical: 16,
    paddingHorizontal: 24,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  body: {
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    backgroundColor: colors.v2.white,
    padding: 16,
  },
});

const shadowStyles = StyleSheet.create({
  container: {
    shadowColor: colors.v2.black,
    shadowOpacity: 0.24,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
});
const borderStyles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.v2.whiteSmoke,
  },
});

export default Card;
