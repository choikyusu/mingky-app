import styled from 'styled-components';

export function CalendarTabItem(props: {
  day: {
    date: Date;
    eventList: EventItem[];
  };
  index: number;
}) {
  const { day, index } = props;
  return (
    <Wrapper
      role="presentation"
      style={{ position: 'absolute', left: `${index * 73}px` }}
    >
      <button
        type="button"
        className="CalendarTab_tab_button"
        role="tab"
        aria-selected="false"
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <span className="CalendarTab_tab_text">
          <span className="CalendarTab_month">{day.date.getMonth() + 1}월</span>
          <span className="CalendarTab_date_wrap">
            <strong className="CalendarTab_date">{day.date.getDate()}</strong>
            <span className="CalendarTab_day">일</span>
          </span>
          <span className="CalendarTab_game_number">
            {day.eventList.map(item => (
              <span className="CalendarTab_mark" aria-hidden="true" />
            ))}
          </span>
        </span>
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.li`
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 5px;
  background-color: #f5f5f5;
  .CalendarTab_tab_button {
    width: 67px;
    height: 64px;
    padding: 2px 11px 9px;
    border: 0;
    background-color: transparent;
    text-align: left;
    .CalendarTab_tab_text {
      position: relative;
      cursor: pointer;
      .CalendarTab_month {
        opacity: 0.8;
        display: block;
        line-height: 24px;
        font-weight: 600;
        font-size: 12px;
        color: #afafaf;
        letter-spacing: -0.9px;
      }
      .CalendarTab_date_wrap {
        display: flex;
        -webkit-box-aling: end;
        align-items: flex-end;
        .CalendarTab_date {
          padding-right: 2px;
          font-size: 18px;
          color: #8c8c8c;
          letter-spacing: -0.5px;
        }
        .CalendarTab_day {
          padding-bottom: 2px;
          font-weight: 500;
          font-size: 11px;
          color: #878686;
          letter-spacing: -0.9px;
        }
      }
      .CalendarTab_game_number {
        display: flex;
        grid-column-gap: 2px;
        column-gap: 2px;
        padding-top: 3px;
        padding-left: 2px;
        .CalendarTab_mark {
          width: 3px;
          height: 3px;
          background-color: #c1c1c1;
          transform: rotate(-45deg);
        }
      }
    }
    .CalendarTab_icon_korea__3AAh6 {
      &:before {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        border-color: #00aa9e #00aa9e transparent transparent;
        border-style: solid;
        border-width: 10px;
      }
      .blind {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
      }
    }
  }
`;
