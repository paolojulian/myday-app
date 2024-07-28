import BottomSheetModal from '@/components/common/BottomSheetModal';
import { Expense } from '@/hooks/services/expense/expense.types';
import { FC } from 'react';
import ReccuredPaymentModalForm from './ReccuredPaymentModalForm/ReccuredPaymentModalForm';
import { RecurredPaymentModalHeader } from './RecurredPaymentHeader';
import { RecurredPaymentModalContainer } from './RecurredPaymentModal.style';

type RecurredPaymentModalProps = {
  onClose: () => void;
  isOpen: boolean;
  expense: Expense | null;
};

const RecurredPaymenModal: FC<RecurredPaymentModalProps> = ({ onClose, isOpen, expense }) => {
  return (
    <BottomSheetModal onClose={onClose} isOpen={isOpen} minHeight={600} variant="slide">
      {expense ? (
        <RecurredPaymentModalContainer>
          <RecurredPaymentModalHeader onDeleteDone={onClose} expense={expense} />
          <ReccuredPaymentModalForm expense={expense} />
        </RecurredPaymentModalContainer>
      ) : (
        <></>
      )}
    </BottomSheetModal>
  );
};

export default RecurredPaymenModal;
