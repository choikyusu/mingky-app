import styled from 'styled-components';
import { CalendarContent } from './CalendarContent/CalendarContent';

export function CalendarContentArea(props: {
  dayList: {
    date: Date;
    eventList: EventItem[];
  }[];
}) {
  const { dayList } = props;
  return (
    <Content>
      <div className="content_area" role="tabpanel">
        <div className="ScheduleAllType_container__1TcBO">
          {dayList.map(day => (
            <CalendarContent day={day} />
          ))}
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
