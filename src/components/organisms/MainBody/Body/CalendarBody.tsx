import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import stores, { RootState } from '../../../../store/configureStore';
import { useSelector } from 'react-redux';
import { getToday } from '../../../../utils/date.util';
import { modalActions } from '../../../../store/modules/actions/modal.action';

export function CalendarBody() {
  const eventList: { [id: string]: EventItem } = useSelector(
    (state: RootState) => state.event.eventList,
  );
  const [dayList, setDayList] = useState<
    { date: Date; eventList: EventItem[] }[]
  >([]);
  const datePlusOffset = useRef<number>(0);
  const dateMinusOffset = useRef<number>(0);

  const dayRef: React.MutableRefObject<HTMLTableCellElement | null> =
    useRef(null);
  const listRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const list: { date: Date; eventList: EventItem[] }[] = [];
    for (let i = 0; i < 15; i++) {
      const today = getToday();
      const dateEvent: {
        date: Date;
        eventList: EventItem[];
      } = {
        date: new Date(today.setDate(today.getDate() + i)),
        eventList: [],
      };

      Object.values(eventList).forEach(item => {
        if (
          item.startDate <= dateEvent.date &&
          dateEvent.date <= item.endDate
        ) {
          dateEvent.eventList.push(item);
        }
      });

      list.push(dateEvent);
    }

    datePlusOffset.current = 14;

    setDayList([...list]);
  }, []);

  const onScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    console.log(scrollTop, scrollHeight, clientHeight);

    if (scrollTop === 0) {
      const list: { date: Date; eventList: EventItem[] }[] = [];
      for (let i = 0; i < 5; i++) {
        const today = getToday();
        const dateEvent: {
          date: Date;
          eventList: EventItem[];
        } = {
          date: new Date(
            today.setDate(today.getDate() - dateMinusOffset.current - i),
          ),
          eventList: [],
        };

        Object.values(eventList).forEach(item => {
          if (
            item.startDate <= dateEvent.date &&
            dateEvent.date <= item.endDate
          ) {
            dateEvent.eventList.push(item);
          }
        });

        list.push(dateEvent);
      }

      dateMinusOffset.current += 5;

      setDayList([...list.reverse(), ...dayList]);

      listRef.current?.scrollTo({ top: 400 });
    }

    if (scrollTop + clientHeight === scrollHeight) {
      const list: { date: Date; eventList: EventItem[] }[] = [];
      for (let i = 1; i < 6; i++) {
        const today = getToday();
        const dateEvent: {
          date: Date;
          eventList: EventItem[];
        } = {
          date: new Date(
            today.setDate(today.getDate() + datePlusOffset.current + i),
          ),
          eventList: [],
        };

        Object.values(eventList).forEach(item => {
          if (
            item.startDate <= dateEvent.date &&
            dateEvent.date <= item.endDate
          ) {
            dateEvent.eventList.push(item);
          }
        });

        list.push(dateEvent);
      }

      datePlusOffset.current += 5;

      setDayList([...dayList, ...list]);
    }
  };
  useEffect(() => {
    listRef?.current?.addEventListener('scroll', onScroll);
    return () => {
      listRef?.current?.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <Wrapper>
      <div className="body" ref={listRef}>
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
                    <div
                      role="button"
                      tabIndex={0}
                      onMouseDown={() =>
                        stores.dispatch(
                          modalActions.setDialogStatus({
                            id: 'EVENT',
                            data: { event },
                          }),
                        )
                      }
                    >
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
    height: 80vh;
    overflow: auto;

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
