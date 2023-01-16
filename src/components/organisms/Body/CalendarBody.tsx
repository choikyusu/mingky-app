import styled from 'styled-components';
import React from 'react';
import { CalendarMenu } from '../../molecules/CalendarTab/CalendarTab';
import { CalendarContentArea } from '../../molecules/CalendarContentArea/CalendarContentArea';
import useCalendarBody from '../../../hooks/useCalendarBody';

export function CalendarBody(props: { events: EventItem[] }) {
  const { events } = props;

  const newCalendarBody = useCalendarBody(events);

  return (
    <Wrapper>
      <CalendarMenu {...newCalendarBody} />
      <CalendarContentArea
        dayList={newCalendarBody.dayList}
        dayCardRefList={newCalendarBody.dayCardRefList}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  text-align: center;
  justify-content: center;

  ul {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 1.25;
  }
`;
