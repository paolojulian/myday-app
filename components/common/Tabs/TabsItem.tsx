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

type TabsItemProps<T> = {
  item: T;
  onSelect: (item: T) => void;
  isSelected: boolean;
  isCompact: boolean;
  variant: TabsVariant;
};

function TabsItem<T extends string>({
  onSelect,
  isCompact,
  isSelected,
  item,
  variant,
}: TabsItemProps<T>) {
  const handlePress = () => onSelect(item);
  const resolvedStyles = variant === 'default' ? defaultStyles : invertedStyles;

  return (
    <TouchableWithoutFeedback
      testID={TABS_ITEM_TEST_IDS.containerBtn(item, isSelected)}
      onPress={handlePress}
    >
      <ThemedView
        style={[
          styles.container,
          {
            ...(isSelected && resolvedStyles.container),
            ...(isCompact ? compactStyles.container : nonCompactStyles.container),
          },
        ]}
      >
        <ThemedText
          style={{
            ...resolvedStyles.text,
            ...(isSelected && resolvedStyles.textActive),
          }}
          testID={TABS_ITEM_TEST_IDS.text(item)}
        >
          {item}
        </ThemedText>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
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
    backgroundColor: colors.black,
  },
  text: {
    color: colors.black,
  },
  textActive: {
    color: colors.white,
  },
});

const invertedStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  text: {
    color: colors.white,
  },
  textActive: {
    color: colors.black,
  },
});

export default TabsItem;
