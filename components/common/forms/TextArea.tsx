import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

type TextAreaProps = {
  label: string;
  numberOfLines?: number;
} & TextInputProps;

const TextArea = forwardRef<TextInput, TextAreaProps>(
  ({ label, numberOfLines = 4, ...props }, ref) => {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.label}>
          <ThemedText>{label}</ThemedText>
        </ThemedView>
        <TextInput
          {...props}
          ref={ref}
          placeholderTextColor={colors.grey}
          style={styles.textInput}
          multiline
          numberOfLines={numberOfLines}
        />
      </ThemedView>
    );
  },
);

TextArea.displayName = 'TextArea';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: colors.whiteSmoke,
    gap: 4,
  },
  label: {
    zIndex: 1,
    position: 'absolute',
    top: 12,
    left: 24,
    color: colors.black,
  },
  textInput: {
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.whiteSmoke,
    borderRadius: 8,
    fontSize: 16,
    color: colors.black,
    minHeight: 100, // Adjust this to change the initial height of the TextArea
  },
});

export default TextArea;
