import styled from 'styled-components';
import { useEffect, useState } from 'react';

export function CalendarBody() {
  const [dayList, setDayList] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    const list: Date[] = [];
    for (let i = 0; i < 15; i++) {
      const newDay = new Date();
      list.push(new Date(newDay.setDate(today.getDate() + i)));
    }

    setDayList(list);
  }, []);

  return (
    <Wrapper>
      <div className="body">
        {dayList.map(day => (
          <div>
            <div className="card">
              <div className="title">
                {`${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`}
              </div>
              <div className="event-list">contents</div>
            </div>
            <hr />
          </div>
        ))}
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
