import TextField, { type TextFieldProps } from '@/components/common/forms/TextField';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import Stack from '../../Stack';

type ComboBoxVariant = 'inline' | 'bottom-sheet';

type ComboBoxProps<T extends string> = {
  onSelect: (value: T) => void;
  options?: T[];
  variant?: ComboBoxVariant;
} & TextFieldProps;

function ComboBox<T extends string = string>(
  { onSelect, options = [], variant = 'inline', ...props }: ComboBoxProps<T>,
  ref: React.Ref<TextInput>,
) {
  const [willShowOptions, setWillShowOptions] = useState(false);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(props.value?.toLowerCase() ?? ''),
  );

  const handleFocus = () => setWillShowOptions(true);
  const handleBlur: TextInputProps['onBlur'] = e => {
    setWillShowOptions(false);
    if (props.onBlur) props.onBlur(e);
  };
  const handlePressItem = (value: T) => {
    onSelect(value);
    setWillShowOptions(false);
  };

  return (
    <ThemedView
      style={{
        position: 'relative',
        zIndex: 10,
      }}
    >
      {variant === 'inline' && (
        <TextField ref={ref} {...props} onFocus={handleFocus} onBlur={handleBlur} />
      )}
      {variant === 'bottom-sheet' && (
        <TouchableOpacity onPress={() => setWillShowOptions(true)}>
          <Stack
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: colors.v2.whiteSmoke,
              borderRadius: 8,
            }}
          ></Stack>
        </TouchableOpacity>
      )}
      {willShowOptions && (
        <ThemedView
          style={{
            marginTop: 8,
            borderRadius: 8,
            paddingVertical: 8,
            flexDirection: 'column',
            backgroundColor: colors.v2.whiteSmoke,
            borderWidth: 1,
            borderColor: colors.v2.black,
          }}
        >
          {filteredOptions.map(item => (
            <TouchableOpacity key={item} onPress={() => handlePressItem(item)}>
              <ThemedView
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                }}
              >
                <ThemedText>{item}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
          {filteredOptions.length === 0 && (
            <TouchableOpacity
              onPress={() => {
                if (props.value) {
                  handlePressItem(props.value as T);
                }
              }}
            >
              <ThemedView
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                }}
              >
                <ThemedText>Create new category "{props.value}"</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          )}
        </ThemedView>
      )}
    </ThemedView>
  );
}

export default forwardRef(ComboBox) as <T extends string>(
  props: ComboBoxProps<T> & { ref?: React.Ref<TextInput> },
) => React.ReactElement;
