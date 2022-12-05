import styled from 'styled-components';
import { getToday, getYYYYMMDD } from '../../../utils/date.util';

const TODAY = 'Today';

export function CalendarCard(props: { event: EventItem }) {
  const { event } = props;
  const dDay = (() => {
    const today = getToday();

    if (getYYYYMMDD(today) < getYYYYMMDD(event.startDate)) {
      return `D-${
        Math.floor(event.startDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
      }`;
    }

    if (
      getYYYYMMDD(today) >= getYYYYMMDD(event.startDate) &&
      getYYYYMMDD(today) <= getYYYYMMDD(event.endDate)
    ) {
      return TODAY;
    }

    return `종료`;
  })();

  return (
    <Wrapper className="ScheduleGameBox_game_box__23m0b">
      {/* <div className="icon">
        <div>{event.category}</div>
      </div> */}
      <div className="d-day" data-dday={dDay === TODAY}>
        {dDay}
      </div>
      <div>
        <div className="category">{event.category}</div>
        <strong className="title">{event.nameText}</strong>
        <div className="date">
          {getYYYYMMDD(event.startDate)}
          {getYYYYMMDD(event.startDate) !== getYYYYMMDD(event.endDate)
            ? ` ~ ${getYYYYMMDD(event.endDate)}`
            : ''}
        </div>
      </div>
      <div className="content">{event.summary}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &.ScheduleGameBox_game_box__23m0b {
    &.ScheduleGameBox_game_box__23m0b {
      margin-top: 10px;
    }

    padding: 24px;
    justify-content: left;
    text-align: left;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--color-schedule-box-border);
    background-color: #f9f9f9;

    .d-day {
      &[data-dday='true'] {
        background: #ff4343;
      }

      top: 10px;
      right: 20px;
      position: absolute;
      background: #42cc79;
      border-radius: 24px;
      padding: 4px 16px;
      color: #ffffff;
    }

    .icon {
      top: 0;
      right: 0;
      padding: 4px;
      border-radius: 0 0 0 20px;
      background-color: #c8c8c8;
      position: absolute;
    }

    .category {
      color: #868be6;
      font-weight: 800;
      font-size: 16px;
    }

    .title {
      font-size: 28px;
    }
    .date {
      color: #4d4c4c;
      font-size: 14px;
    }
    .content {
      position: relative;
      padding-top: 7px;
      margin-top: 7px;

      &:before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-top: 1px solid #cccccc;
        content: '';
      }
    }
  }
`;
