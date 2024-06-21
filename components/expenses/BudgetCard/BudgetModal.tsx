import BottomSheetModal from '@/components/common/BottomSheetModal';
import Button from '@/components/common/Button';
import TextField from '@/components/common/forms/TextField';
import ThemedView from '@/components/common/ThemedView';
import React, { useEffect, useState } from 'react';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const budgetModalManager = new EventEmitter();

enum BudgetModalEvent {
  SHOW = 'show',
  HIDE = 'hide',
}

function show() {
  budgetModalManager.emit(BudgetModalEvent.SHOW);
}
function hide() {
  budgetModalManager.emit(BudgetModalEvent.HIDE);
}

export const BudgetModalManager = {
  show,
  hide,
};

function BudgetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const currentMonthlyBudget = null;
  const saveButtonText = currentMonthlyBudget ? 'Update' : 'Save';

  const handleSavePressed = () => {};
  const handleHide = () => {
    setIsOpen(false);
  };
  const handleShow = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    budgetModalManager.addListener(BudgetModalEvent.SHOW, handleShow);
    budgetModalManager.addListener(BudgetModalEvent.SHOW, handleHide);
    return () => {
      budgetModalManager.removeAllListeners(BudgetModalEvent.SHOW);
      budgetModalManager.removeAllListeners(BudgetModalEvent.HIDE);
    };
  }, []);

  return (
    <>
      <BottomSheetModal onClose={handleHide} isOpen={isOpen}>
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
