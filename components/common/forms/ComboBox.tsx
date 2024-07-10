import TextField, { type TextFieldProps } from '@/components/common/forms/TextField';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';

type ComboBoxProps<T extends string> = {
  onSelect: (value: T) => void;
  options?: T[];
} & TextFieldProps;

function ComboBox<T extends string = string>(
  { onSelect, options = [], ...props }: ComboBoxProps<T>,
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
      <TextField ref={ref} {...props} onFocus={handleFocus} onBlur={handleBlur} />
      {willShowOptions && (
        <ThemedView
          style={{
            marginTop: 8,
            borderRadius: 8,
            paddingVertical: 8,
            flexDirection: 'column',
            backgroundColor: colors.whiteSmoke,
            borderWidth: 1,
            borderColor: colors.black,
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

          {/* <FlatList<T>
            data={options}
            keyExtractor={item => item}
            keyboardShouldPersistTaps='always'
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPressIn={() => handlePressItem(item)}>
                <ThemedView
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                >
                  <ThemedText>{item}</ThemedText>
                </ThemedView>
              </TouchableWithoutFeedback>
            )}
          /> */}
        </ThemedView>
      )}
    </ThemedView>
  );
}

export default forwardRef(ComboBox) as <T extends string>(
  props: ComboBoxProps<T> & { ref?: React.Ref<TextInput> },
) => React.ReactElement;
