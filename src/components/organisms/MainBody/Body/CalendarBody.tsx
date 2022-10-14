import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../../../store/configureStore';
import { useSelector } from 'react-redux';
import { getToday } from '../../../../utils/date.util';

export function CalendarBody() {
  const eventList: EventItem[] = useSelector(
    (state: RootState) => state.event.eventList,
  );
  const [dayList, setDayList] = useState<
    { date: Date; eventList: EventItem[] }[]
  >([]);

  const dayRef: React.MutableRefObject<HTMLTableCellElement | null> =
    useRef(null);

  useEffect(() => {
    const list: { date: Date; eventList: EventItem[] }[] = [];
    for (let i = -1; i < 15; i++) {
      const today = getToday();
      const dateEvent: {
        date: Date;
        eventList: EventItem[];
      } = {
        date: new Date(today.setDate(today.getDate() + i)),
        eventList: [],
      };

      eventList.forEach(item => {
        if (
          item.startDate <= dateEvent.date &&
          dateEvent.date <= item.endDate
        ) {
          dateEvent.eventList.push(item);
        }
      });

      list.push(dateEvent);
    }

    setDayList(list);
  }, []);

  return (
    <Wrapper>
      <div className="body">
        {dayList.map(dateInfo => {
          return (
            <div ref={dayRef}>
              <div className="card">
                <div className="title">
                  {`${dateInfo.date.getFullYear()}-${
                    dateInfo.date.getMonth() + 1
                  }-${dateInfo.date.getDate()}`}
                </div>
                <div className="event-list">
                  {dateInfo.eventList.map(event => (
                    <div>
                      {event.name} {event.status}
                    </div>
                  ))}
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;

  .body {
    background: #f7f7f7;
    max-width: 450px;
    width: 100%;

    .card {
      width: 402px;
      height: 64px;
      display: flex;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #8c8a8a;
        margin-right: 10px;
      }
    }
  }

  hr {
    border: 1px solid #c8c8c8;
  }
`;
