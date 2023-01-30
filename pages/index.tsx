import React from 'react';
import { HomeBody } from '../src/components/organisms/Body/HomeBody';
import { MainHeader } from '../src/components/organisms/MainHeader/MainHeader';
import ModalContainer from '../src/components/organisms/ModalContainer/ModalContainer';

export default function Home() {
  return (
    <>
      <MainHeader />
      <HomeBody />
      <ModalContainer />
    </>
  );
}
