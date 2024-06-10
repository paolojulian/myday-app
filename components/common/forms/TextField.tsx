import Label from '@/components/common/forms/Label';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { ComponentProps, forwardRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export type TextFieldProps = {
  label: string;
} & TextInputProps;

const TextField = forwardRef<TextInput, TextFieldProps>(({ label, style, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus: ComponentProps<typeof TextInput>['onFocus'] = e => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur: ComponentProps<typeof TextInput>['onBlur'] = e => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  return (
    <ThemedView style={[styles.container]}>
      <ThemedView style={styles.label}>
        <Label text={label} />
      </ThemedView>
      <TextInput
        {...props}
        ref={ref}
        placeholderTextColor={colors.grey}
        style={[
          style,
          styles.textInput,
          {
            ...(isFocused && styles.textInputWithFocus),
          },
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
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
  },
  textInput: {
    fontSize: 20,
    paddingTop: 36,
    paddingBottom: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.whiteSmoke,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textInputWithFocus: {
    borderColor: colors.black,
  },
});

export default TextField;
