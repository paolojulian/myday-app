import * as Yup from 'yup';
export const RECCURED_PAYMENT_MODAL_SCHEMA = Yup.object().shape({
  amount: Yup.number().required('Amount is required'),
  description: Yup.string().max(255),
});

export type RecurredPaymentModalValues = Yup.InferType<typeof RECCURED_PAYMENT_MODAL_SCHEMA>;
