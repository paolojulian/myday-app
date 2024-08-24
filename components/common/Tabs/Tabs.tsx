import TabsItem, { TabItem } from '@/components/common/Tabs/TabsItem';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export type TabsVariant = 'default' | 'inverted' | 'default-separated';

type TabsProps<T extends string | number> = {
  onSelect: (item: T) => void;
  selectedItem: T;
  items: TabItem<T>[];
  variant?: TabsVariant;
  isCompact?: boolean;
};

export default function Tabs<T extends string | number>({
  onSelect,
  selectedItem,
  items,
  variant = 'default',
  isCompact = false,
}: TabsProps<T>) {
  const resolvedStyles = getResolvedStyles(variant);

  return (
    <ThemedView
      style={[styles.container, resolvedStyles.container, { ...(isCompact ? styles.compact : {}) }]}
    >
      {items.map(item => (
        <TabsItem<T>
          key={item.key}
          onSelect={onSelect}
          isSelected={selectedItem === item.key}
          isCompact={isCompact}
          item={item}
          variant={variant}
        />
      ))}
    </ThemedView>
  );
}

const getResolvedStyles = (variant: TabsVariant) => {
  const variantMap: Record<TabsVariant, any> = {
    default: defaultStyles,
    inverted: invertedStyles,
    'default-separated': defaultSeparatedStyles,
  };

  if (!variantMap[variant]) throw new Error(`Invalid variant: ${variant}`);

  return variantMap[variant];
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 100,
  },
  compact: {
    gap: 8,
  },
});

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.v2.grayDark,
  },
});

const invertedStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
});

const defaultSeparatedStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
});
