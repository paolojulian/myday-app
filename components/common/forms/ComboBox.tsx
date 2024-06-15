import TextField, { type TextFieldProps } from '@/components/common/forms/TextField';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

type ComboBoxProps<T extends string> = {
  onSelect: (value: T) => void;
  options?: T[];
} & TextFieldProps;

function ComboBox<T extends string = string>({
  onSelect,
  options = [],
  ...props
}: ComboBoxProps<T>) {
  const [willShowOptions, setWillShowOptions] = useState(false);

  const handleFocus = () => setWillShowOptions(true);
  const handleBlur = () => setWillShowOptions(false);
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
      <TextField {...props} onFocus={handleFocus} onBlur={handleBlur} />
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
          {options.map(item => (
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

export default ComboBox;
