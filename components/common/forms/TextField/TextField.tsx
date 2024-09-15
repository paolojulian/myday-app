import Label from '@/components/common/forms/Label';
import ThemedText, { textVariantStyles } from '@/components/common/ThemedText/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { ComponentProps, forwardRef, useMemo, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export const TEXT_FIELD_TEST_IDS = {
  textInput: 'textField__textInput',
  errorMessage: 'textField__errorMessage',
};

export type TextFieldProps = {
  formatter?: (value: any) => string | undefined;
  label: string;
  isError?: boolean;
  errorMessage?: string;
} & TextInputProps;

const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      onChangeText,
      formatter = (value: any) => value,
      label,
      value,
      isError = false,
      errorMessage,
      style,
      ...props
    },
    ref,
  ) => {
    //#region states =========================
    const [isFocused, setIsFocused] = useState(false);
    //#endregion states

    //#region computed =========================
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

    const formattedValue = formatter(value);
    //#endregion computed

    //#region callbacks =========================
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

    const handleChangeText: TextInputProps['onChangeText'] = (text): void => {
      onChangeText?.(text);
    };
    //#endregion callbacks

    return (
      <ThemedView style={[styles.container]}>
        <ThemedView style={styles.label}>
          <Label text={label} />
        </ThemedView>
        <TextInput
          {...props}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
          testID={props.testID ? props.testID : TEXT_FIELD_TEST_IDS.textInput}
          placeholderTextColor={colors.v2.grayLight}
          style={[style, styles.textInput, textVariantStyles['body-md'], resolvedTextInputStyle]}
          value={formattedValue}
        />

        {!!errorMessage && isError && (
          <ThemedText
            testID={TEXT_FIELD_TEST_IDS.errorMessage}
            style={{ color: colors.v2.accent, paddingTop: 8 }}
          >
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
    backgroundColor: colors.v2.grayDark,
    color: colors.v2.white,
    borderRadius: 8,
    borderWidth: 1,
  },
  textInputDefault: {
    borderColor: 'transparent',
  },
  textInputWithFocus: {
    borderColor: colors.v2.black,
  },
  textInputWithError: {
    borderColor: colors.v2.accent,
  },
});

export default TextField;
