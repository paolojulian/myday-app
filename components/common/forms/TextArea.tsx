import TextField, { TextFieldProps } from '@/components/common/forms/TextField';
import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';

export type TextAreaProps = {
  label: string;
  numberOfLines?: number;
  minHeight?: number;
} & Omit<TextFieldProps, 'multiline'>;

const TextArea = forwardRef<TextInput, TextAreaProps>(
  ({ label, numberOfLines = 4, minHeight = 120, ...props }, ref) => {
    return (
      <TextField
        {...props}
        style={{
          minHeight,
        }}
        ref={ref}
        numberOfLines={numberOfLines}
        label={label}
        multiline
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
