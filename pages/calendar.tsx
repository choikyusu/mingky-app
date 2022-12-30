import React from 'react';
import { CalendarBody } from '../src/components/organisms/Body/CalendarBody';
import { MainHeader } from '../src/components/organisms/MainHeader/MainHeader';

export default function Calendar() {
  return (
    <>
      <MainHeader />
      <CalendarBody />
    </>
  );
}
