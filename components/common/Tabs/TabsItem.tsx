import { TabsVariant } from '@/components/common/Tabs/Tabs';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

export const TABS_ITEM_TEST_IDS = {
  containerBtn: (id: string, isSelected: boolean) => `tabs-item-container-btn-${id}-${isSelected}`,
  text: (id: string) => `tabs-item-text-${id}`,
};

export type TabItem<T extends string | number> = {
  key: T;
  value: string;
};

type TabsItemProps<T extends string | number> = {
  item: TabItem<T>;
  onSelect: (key: T) => void;
  isSelected: boolean;
  isCompact: boolean;
  variant: TabsVariant;
};

function TabsItem<T extends string | number>({
  onSelect,
  isCompact,
  isSelected,
  item,
  variant,
}: TabsItemProps<T>) {
  const handlePress = () => onSelect(item.key);
  const resolvedStyles = getResolvedStyles(variant);

  return (
    <TouchableWithoutFeedback
      testID={TABS_ITEM_TEST_IDS.containerBtn(item.value, isSelected)}
      onPress={handlePress}
    >
      <ThemedView
        style={[
          styles.container,
          resolvedStyles.container,
          {
            ...(isSelected && resolvedStyles.containerSelected),
            ...(isCompact ? compactStyles.container : nonCompactStyles.container),
          },
        ]}
      >
        <ThemedText
          variant="header-sm"
          style={{
            ...styles.text,
            ...resolvedStyles.text,
            ...(isSelected && resolvedStyles.textActive),
          }}
          testID={TABS_ITEM_TEST_IDS.text(item.value)}
        >
          {item.value}
        </ThemedText>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const getResolvedStyles = (variant: TabsVariant) => {
  const variantMap = {
    default: defaultStyles,
    inverted: invertedStyles,
    'default-separated': defaultSeparatedStyles,
  } satisfies Record<TabsVariant, any>;

  if (!variantMap[variant]) throw new Error(`Invalid variant: ${variant}`);

  return variantMap[variant];
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  text: {
    textTransform: 'capitalize',
  },
});

const compactStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

const nonCompactStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  containerSelected: {
    backgroundColor: colors.v2.white,
  },
  text: {
    color: colors.v2.white,
  },
  textActive: {
    color: colors.v2.black,
  },
});

const invertedStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  containerSelected: {
    backgroundColor: colors.white,
  },
  text: {
    color: colors.white,
  },
  textActive: {
    color: colors.black,
  },
});

const defaultSeparatedStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.v2.grayDark,
  },
  containerSelected: {
    backgroundColor: colors.black,
  },
  text: {
    color: colors.black,
  },
  textActive: {
    color: colors.white,
  },
});

export default TabsItem;
