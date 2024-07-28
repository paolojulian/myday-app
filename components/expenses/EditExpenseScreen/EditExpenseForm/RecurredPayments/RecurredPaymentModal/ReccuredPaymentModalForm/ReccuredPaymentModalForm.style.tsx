import TextArea, { TextAreaProps } from '@/components/common/forms/TextArea';
import TextField, { TextFieldProps } from '@/components/common/forms/TextField';
import { forwardRef } from 'react';
import { TextInput } from 'react-native';

type ReccuredPaymentAmountFieldProps = Pick<
  TextFieldProps,
  'onChangeText' | 'onBlur' | 'errorMessage' | 'isError' | 'value'
>;
export const RecurredPaymentAmountField = forwardRef<TextInput, ReccuredPaymentAmountFieldProps>(
  function ReccuredPaymentAmountField(props, ref) {
    return (
      <TextField
        {...props}
        ref={ref}
        label="Amount"
        placeholder="00.00"
        keyboardType="numeric"
        returnKeyLabel="Next"
        returnKeyType="next"
      />
    );
  },
);

type RecurredPaymentNoteFieldProps = Pick<
  TextAreaProps,
  'onChangeText' | 'onBlur' | 'errorMessage' | 'isError' | 'value'
>;
export const RecurredPaymentNoteField = forwardRef<TextInput, RecurredPaymentNoteFieldProps>(
  function RecurredPaymentNoteField(props, ref) {
    return (
      <TextArea
        {...props}
        ref={ref}
        label="Note"
        placeholder="You can set a separate note for this transaction"
        returnKeyType="next"
      />
    );
  },
);
