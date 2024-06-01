import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

type TabsProps<T> = {
  onSelect: (item: T) => void;
  selectedItem: T;
  items: T[];
};

export default function Tabs<T extends string>({ onSelect, selectedItem, items }: TabsProps<T>) {
  return (
    <ThemedView style={styles.container}>
      {items.map(item => (
        <TouchableWithoutFeedback key={item} onPress={() => onSelect(item)}>
          <ThemedView
            style={[
              styles.item,
              {
                ...(selectedItem === item && styles.itemActive),
              },
            ]}
          >
            <ThemedText style={{ ...(selectedItem === item && styles.itemTextActive) }}>
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
    backgroundColor: colors.whiteSmoke,
    borderRadius: 100,
  },
  item: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    color: colors.black,
  },
  itemActive: {
    backgroundColor: colors.black,
  },
  itemTextActive: {
    color: colors.white,
  },
});
