import { colors } from '@/constants/Colors';
import { Category } from '@/hooks/services/category/category.types';
import useCategories from '@/hooks/services/category/useCategories';
import { useState } from 'react';
import { Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import BottomSheetModal from '../BottomSheetModal';
import Label from '../forms/Label';
import TextField from '../forms/TextField';
import Stack from '../Stack';
import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';
import CategoryOption from './CategoryOption';

type CategorySelectProps = {
  onSelect: (value: Category['category_name']) => void;
  onClose?: () => void;
  value?: Category['category_name'];
};

export default function CategorySelect({ onSelect, onClose, value }: CategorySelectProps) {
  const [category, setCategory] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: categories } = useCategories();

  const filteredCategories = categories.filter(item =>
    item.category_name.toLowerCase().includes(category?.toLowerCase() ?? ''),
  );

  const handlePress = () => {
    Keyboard.dismiss();
    setIsOpen(true);
  };
  const close = () => {
    if (onClose) onClose();
    setIsOpen(false);
  };

  const handleSelect = (value: Category['category_name']) => {
    close();
    onSelect(value);
  };

  const formattedValue = value === null ? 'None' : value;

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <ThemedView
          style={{
            backgroundColor: colors.v2.grayDark,
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 16,
            gap: 8,
          }}
        >
          <Label text="Category" />
          <ThemedText
            variant="body-md"
            style={{
              textTransform: formattedValue ? 'capitalize' : 'none',
              color: formattedValue ? colors.v2.white : colors.v2.grayLight,
            }}
          >
            {formattedValue || 'e.g. Restaurant, Grocery'}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
      <BottomSheetModal variant="slide" isOpen={isOpen} onClose={close}>
        <Stack style={{ gap: 16 }}>
          <TextField
            autoFocus
            label="Category"
            value={category}
            onChangeText={setCategory}
            onSubmitEditing={() => handleSelect(category)}
            placeholder="e.g. Restaurant, Grocery"
            returnKeyLabel="Done"
            returnKeyType="done"
          />
          <ScrollView style={{ height: 300 }} keyboardShouldPersistTaps="handled">
            <Stack style={{ gap: 4 }}>
              {filteredCategories.map(category => (
                <CategoryOption
                  key={category.id}
                  isSelected={value === category.category_name}
                  title={category.category_name}
                  onPress={() => handleSelect(category.category_name)}
                />
              ))}
              {filteredCategories.length === 0 && (
                <CategoryOption
                  isSelected={false}
                  title={`Create new category "${category}"`}
                  onPress={() => handleSelect(category)}
                />
              )}
            </Stack>
          </ScrollView>
        </Stack>
      </BottomSheetModal>
    </>
  );
}
