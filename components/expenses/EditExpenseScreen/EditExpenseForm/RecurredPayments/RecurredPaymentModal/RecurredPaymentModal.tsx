import BottomSheetModal from '@/components/common/BottomSheetModal';
import { Expense } from '@/hooks/services/expense/expense.types';
import dayjs from 'dayjs';
import { FC } from 'react';
import {
  RecurredPaymentModalContainer,
  RecurredPaymentModalHeader,
} from './RecurredPaymentModal.style';

type RecurredPaymentModalProps = {
  onClose: () => void;
  isOpen: boolean;
  expense: Expense | null;
};

const RecurredPaymenModal: FC<RecurredPaymentModalProps> = ({ onClose, isOpen, expense }) => {
  return (
    <BottomSheetModal onClose={onClose} isOpen={isOpen} minHeight={400}>
      <RecurredPaymentModalContainer>
        {expense?.transaction_date && (
          <RecurredPaymentModalHeader
            title={dayjs.unix(expense?.transaction_date).format('MMM D')}
          />
        )}
      </RecurredPaymentModalContainer>
    </BottomSheetModal>
  );
};

export default RecurredPaymenModal;
