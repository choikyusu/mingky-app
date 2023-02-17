import React from 'react';
import { AdminBody } from '../src/components/organisms/Body/AdminBody';
import { MainHeader } from '../src/components/organisms/MainHeader/MainHeader';
import ModalContainer from '../src/components/organisms/ModalContainer/ModalContainer';
import ModalProvider from '../src/components/organisms/ModalContainer/ModalProvider';

export default function Settings() {
  return (
    <ModalProvider>
      <MainHeader />
      <AdminBody />
      <ModalContainer />
    </ModalProvider>
  );
}
