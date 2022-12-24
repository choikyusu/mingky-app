import styled from 'styled-components';
import { getDayOfWeek } from '../../../../utils/date.util';
import { CalendarCard } from '../../../atoms/CalendarCard/CalendarCard';

export function CalendarContent(props: {
  day: {
    date: Date;
    eventList: EventItem[];
  };
  dayCardRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const { day, dayCardRef } = props;

  return (
    <Wrapper ref={dayCardRef}>
      <div className="ScheduleAllType_game_date__1B_hR" aria-hidden>
        <em className="ScheduleAllType_date__1NfTN">
          {day.date.getMonth() + 1}.{day.date.getDate()}
        </em>
        <span>{getDayOfWeek(day.date)}</span>
      </div>
      <div className="game_box_list">
        {day.eventList.map(event => (
          <CalendarCard event={event} />
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 17px;
  :first-child {
    padding-top: 0;
  }
  .ScheduleAllType_game_date__1B_hR {
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    grid-column-gap: 4px;
    column-gap: 4px;
    font-size: 14px;
    color: #232441;
    color: var(--color-schedule-game-date);
    .ScheduleAllType_date__1NfTN {
      font-weight: 800;
      font-size: 17px;
      color: var(--color-schedule-date);
    }
  }
  .game_box_list {
    display: block;
  }
`;
