import React, { createContext, Fragment, useContext, useState } from 'react';

type ModalContextType = {
  handleOpenModal: (type: ModalTypes) => void;
  handleCloseModal: (type: ModalTypes) => void;
  modalsState: Record<ModalTypes, boolean>;
};

const initialState = {
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  modalsState: {
    updateBudgetModal: false,
  },
} satisfies ModalContextType;
export const ModalContext = createContext<ModalContextType>(initialState);

export enum ModalTypes {
  updateBudgetModal = 'updateBudgetModal',
}

type ModalProviderProps = {
  modals: {
    type: ModalTypes;
    element: React.ReactElement;
  }[];
  children: React.ReactElement;
};
export default function ModalProvider({ children, modals }: ModalProviderProps) {
  const [modalsState, setModalsState] = useState<Record<ModalTypes, boolean>>(
    initialState.modalsState,
  );

  const handleOpenModal = (type: ModalTypes) => {
    setModalsState(prev => ({ ...prev, [type]: true }));
  };

  const handleCloseModal = (type: ModalTypes) => {
    setModalsState(prev => ({ ...prev, [type]: false }));
  };

  return (
    <ModalContext.Provider value={{ handleOpenModal, handleCloseModal, modalsState }}>
      <>
        {modals.map(({ type, element }) => (
          <Fragment key={type}>{element}</Fragment>
        ))}
        {children}
      </>
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
