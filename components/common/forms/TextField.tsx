import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

type TextFieldProps = {
  label: string;
} & TextInputProps;

const TextField = forwardRef<TextInput, TextFieldProps>(({ label, ...props }, ref) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.label}>
        <ThemedText>{label}</ThemedText>
      </ThemedView>
      <TextInput {...props} ref={ref} placeholderTextColor={colors.grey} style={styles.textInput} />
    </ThemedView>
  );
});

TextField.displayName = 'TextField';

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
