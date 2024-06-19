import TabsItem from '@/components/common/Tabs/TabsItem';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export type TabsVariant = 'default' | 'inverted';

type TabsProps<T> = {
  onSelect: (item: T) => void;
  selectedItem: T;
  items: T[];
  variant?: TabsVariant;
  isCompact?: boolean;
};

export default function Tabs<T extends string>({
  onSelect,
  selectedItem,
  items,
  variant = 'default',
  isCompact = false,
}: TabsProps<T>) {
  const resolvedStyles = variant === 'default' ? defaultStyles : invertedStyles;

  return (
    <ThemedView
      style={[styles.container, resolvedStyles.container, { ...(isCompact ? styles.compact : {}) }]}
    >
      {items.map(item => (
        <TabsItem
          key={item}
          onSelect={onSelect}
          isSelected={selectedItem === item}
          isCompact={isCompact}
          item={item}
          variant={variant}
        />
      ))}
    </ThemedView>
  );
}

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
    backgroundColor: colors.whiteSmoke,
  },
});

const invertedStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
});
