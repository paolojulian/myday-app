import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

type TabsVariant = 'default' | 'inverted';

type TabsProps<T> = {
  onSelect: (item: T) => void;
  selectedItem: T;
  items: T[];
  variant?: TabsVariant;
};

export default function Tabs<T extends string>({
  onSelect,
  selectedItem,
  items,
  variant = 'default',
}: TabsProps<T>) {
  const resolvedStyles = variant === 'default' ? defaultStyles : invertedStyles;

  return (
    <ThemedView style={[styles.container, resolvedStyles.container]}>
      {items.map(item => (
        <TouchableWithoutFeedback key={item} onPress={() => onSelect(item)}>
          <ThemedView
            style={[
              styles.item,
              {
                ...(selectedItem === item && resolvedStyles.itemActive),
              },
            ]}
          >
            <ThemedText
              style={{
                ...resolvedStyles.itemText,
                ...(selectedItem === item && resolvedStyles.itemTextActive),
              }}
            >
              {item}
            </ThemedText>
          </ThemedView>
        </TouchableWithoutFeedback>
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
  item: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteSmoke,
  },
  itemText: {
    color: colors.black,
  },
  itemActive: {
    backgroundColor: colors.black,
  },
  itemTextActive: {
    color: colors.white,
  },
});

const invertedStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
  itemText: {
    color: colors.white,
  },
  itemActive: {
    backgroundColor: colors.white,
  },
  itemTextActive: {
    color: colors.black,
  },
});
