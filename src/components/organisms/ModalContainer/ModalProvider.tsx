import React, { createContext, useContext, useMemo, useState } from 'react';

type ModalState = {
  modalId: string;
  setModalId: React.Dispatch<React.SetStateAction<string>>;
};

const ModalStateContext = createContext<ModalState | null>(null);

export default function ModalProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [modalId, setModalId] = useState('');

  const value = useMemo(
    () => ({
      modalId,
      setModalId,
    }),
    [modalId],
  );

  return (
    <ModalStateContext.Provider value={value}>
      {children}
    </ModalStateContext.Provider>
  );
}

export function useModalState() {
  const state = useContext(ModalStateContext);
  if (!state) throw new Error('Cannot find ModalProvider');
  return state;
}
