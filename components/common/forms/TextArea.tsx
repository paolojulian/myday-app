import TextField from '@/components/common/forms/TextField';
import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

type TextAreaProps = {
  label: string;
  numberOfLines?: number;
} & TextInputProps;

const TextArea = forwardRef<TextInput, TextAreaProps>(
  ({ label, numberOfLines = 4, ...props }, ref) => {
    return <TextField {...props} ref={ref} numberOfLines={numberOfLines} label={label} multiline />;
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
