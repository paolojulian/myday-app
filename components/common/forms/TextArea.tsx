import TextField from '@/components/common/forms/TextField';
import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

type TextAreaProps = {
  label: string;
  numberOfLines?: number;
  minHeight?: number;
} & Omit<TextInputProps, 'multiline'>;

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
