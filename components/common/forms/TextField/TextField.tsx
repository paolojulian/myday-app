import Label from '@/components/common/forms/Label';
import ThemedText, { themedTextStyles } from '@/components/common/ThemedText/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { ComponentProps, forwardRef, useMemo, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export const TEXT_FIELD_TEST_IDS = {
  textInput: 'textField__textInput',
  errorMessage: 'textField__errorMessage',
};

export type TextFieldProps = {
  label: string;
  isError?: boolean;
  errorMessage?: string;
} & TextInputProps;

const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, isError = false, errorMessage, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const resolvedTextInputStyle = useMemo(() => {
      if (isError) {
        // Error should be the priority
        return styles.textInputWithError;
      }

      if (isFocused) {
        return styles.textInputWithFocus;
      }

      return styles.textInputDefault;
    }, [isFocused, isError]);

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
          testID={TEXT_FIELD_TEST_IDS.textInput}
          placeholderTextColor={colors.grey}
          style={[style, styles.textInput, themedTextStyles.body1, resolvedTextInputStyle]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {!!errorMessage && (
          <ThemedText testID={TEXT_FIELD_TEST_IDS.errorMessage} style={{ color: colors.red }}>
            {errorMessage}
          </ThemedText>
        )}
      </ThemedView>
    );
  },
);

TextField.displayName = 'TextField';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    zIndex: 1,
    position: 'absolute',
    top: 12,
    left: 16,
  },
  textInput: {
    paddingTop: 36,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.whiteSmoke,
    borderRadius: 8,
    borderWidth: 1,
  },
  textInputDefault: {
    borderColor: 'transparent',
  },
  textInputWithFocus: {
    borderColor: colors.black,
  },
  textInputWithError: {
    borderColor: colors.red,
  },
});

export default TextField;
