import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableWithoutFeedback } from 'react-native';

type TextFieldProps = {
  label: string;
} & TextInputProps;

function TextField({ label, ...props }: TextFieldProps) {
  const inputRef = React.useRef<TextInput>(null);

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };
  const handleContainerBlur = () => {
    inputRef.current?.blur();
  };

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress} onBlur={handleContainerBlur}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.label}>
          <ThemedText>{label}</ThemedText>
        </ThemedView>
        <TextInput
          {...props}
          ref={inputRef}
          placeholderTextColor={colors.grey}
          style={styles.textInput}
        />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    zIndex: 1,
    position: 'absolute',
    top: 12,
    left: 24,
    color: colors.black,
  },
  textInput: {
    paddingTop: 36,
    paddingBottom: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.whiteSmoke,
    borderRadius: 8,
  },
});

export default TextField;
