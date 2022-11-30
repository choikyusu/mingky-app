import { useRef } from 'react';
import styled from 'styled-components';
import { CalendarContent } from './CalendarContent/CalendarContent';

export function CalendarContentArea(props: {
  dayList: {
    date: Date;
    eventList: EventItem[];
  }[];
  dayCardRefList: React.MutableRefObject<HTMLDivElement | null>[];
}) {
  const { dayList, dayCardRefList } = props;
  return (
    <Content>
      <div className="content_area" role="tabpanel">
        <div className="ScheduleAllType_container__1TcBO">
          {dayList.map(day => {
            const dayCardRef: React.MutableRefObject<HTMLDivElement | null> =
              useRef(null);
            dayCardRefList.push(dayCardRef);
            return <CalendarContent day={day} dayCardRef={dayCardRef} />;
          })}
        </div>
      </div>
    </Content>
  );
}

const Content = styled.div`
  padding-top: 0px;
  .content_area {
    flex-direction: column;
    padding: 15px 20px 30px;
  }
`;
