import BottomSheetModal from '@/components/common/BottomSheetModal';
import Button from '@/components/common/Button';
import TextField from '@/components/common/forms/TextField';
import ThemedView from '@/components/common/ThemedView';
import { ModalTypes, useModalContext } from '@/providers/ModalProvider';
import React from 'react';

function BudgetModal() {
  const { modalsState, handleCloseModal } = useModalContext();
  const isOpen = !!modalsState.updateBudgetModal;
  const currentMonthlyBudget = null;
  const saveButtonText = currentMonthlyBudget ? 'Update' : 'Save';

  const handleSavePressed = () => {};
  const handleClose = () => {
    handleCloseModal(ModalTypes.updateBudgetModal);
  };

  return (
    <>
      <BottomSheetModal onClose={handleClose} isOpen={isOpen}>
        <ThemedView style={{ gap: 16, paddingVertical: 16 }}>
          <TextField
            autoFocus
            label="Monthly budget"
            keyboardType="numeric"
            placeholder="Enter your monthly budget"
          />
          <Button text={saveButtonText} onPress={handleSavePressed} />
        </ThemedView>
      </BottomSheetModal>
    </>
  );
}

export default BudgetModal;
