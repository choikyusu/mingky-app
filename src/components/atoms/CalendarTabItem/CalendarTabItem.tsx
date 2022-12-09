import { useRef } from 'react';
import styled from 'styled-components';
import { isSameDate } from '../../../utils/date.util';
import { searchUpperElementIsTagName } from '../../../utils/element.util';

export function CalendarTabItem(props: {
  isMouseClick: boolean;
  day: {
    date: Date;
    eventList: EventItem[];
  };
  index: number;
  dayCardRefList: React.MutableRefObject<HTMLDivElement | null>[];
  dayButtonRefList: React.MutableRefObject<HTMLButtonElement | null>[];
  flickCameraRef: React.MutableRefObject<HTMLUListElement | null>;
  isFixed: boolean;
  setCameraPosition: React.Dispatch<
    React.SetStateAction<{
      clientX: number;
      clientY: number;
    }>
  >;
}) {
  const {
    isMouseClick,
    day,
    index,
    dayCardRefList,
    isFixed,
    dayButtonRefList,
    flickCameraRef,
    setCameraPosition,
  } = props;

  const buttonRef: React.MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const buttonWrapperRef: React.MutableRefObject<HTMLLIElement | null> =
    useRef(null);

  dayButtonRefList.push(buttonRef);

  return (
    <Wrapper
      ref={buttonWrapperRef}
      role="presentation"
      style={{ position: 'absolute', left: `${index * 73}px` }}
      data-today={isSameDate(day.date, new Date()) ? 'true' : 'false'}
    >
      <button
        ref={buttonRef}
        type="button"
        className="CalendarTab_tab_button"
        role="tab"
        aria-selected="false"
        onClick={e => {
          if (!isMouseClick) return;

          const offsetTop = dayCardRefList[index].current?.offsetTop;
          if (offsetTop) {
            dayButtonRefList.forEach(button => {
              if (button.current) button.current.removeAttribute('selected');
            });
            const button = searchUpperElementIsTagName(
              e.target as HTMLElement,
              'BUTTON',
            );
            if (button) button.setAttribute('selected', 'true');

            const fixedY = isFixed ? 113 : 0;

            const currentPosition = offsetTop + fixedY - 49;

            if (currentPosition - 113 < 130) window.scrollTo({ top: 0 });
            else window.scrollTo({ top: currentPosition - 113 });

            const width = flickCameraRef.current?.scrollWidth || 0;
            const viewPortWidth = window.visualViewport?.width || 0;
            if (flickCameraRef.current && buttonWrapperRef.current) {
              let clientX = 0;

              if (
                flickCameraRef.current.clientWidth / 2 -
                  buttonWrapperRef.current.offsetLeft >
                0
              ) {
                clientX = 0;
              } else if (
                flickCameraRef.current.scrollWidth -
                  buttonWrapperRef.current.offsetLeft <
                viewPortWidth / 2
              ) {
                clientX = -width + viewPortWidth - 40;
              } else {
                clientX =
                  flickCameraRef.current.clientWidth / 2 -
                  buttonWrapperRef.current.offsetLeft;
              }

              const camera = flickCameraRef.current;
              camera.style.transform = `translate3d(${clientX}px, 0px, 0px)`;

              setCameraPosition({
                clientX,
                clientY: 0,
              });
            }
          }
        }}
      >
        <span className="CalendarTab_tab_text">
          <span className="CalendarTab_month">{day.date.getMonth() + 1}월</span>
          <span className="CalendarTab_date_wrap">
            <strong className="CalendarTab_date">{day.date.getDate()}</strong>
            <span className="CalendarTab_day">일</span>
          </span>
          <span className="CalendarTab_game_number">
            {day.eventList.map(() => (
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

  &[data-today='true'] {
    &:before {
      content: '';
      width: 25px;
      height: 25px;
      top: -12px;
      right: -12px;
      background-color: #48dad2;
      position: absolute;
      transform: rotate(45deg);
    }
  }

  .CalendarTab_tab_button[selected='true'] {
    background-color: #5b002f;
    .CalendarTab_month {
      color: #ffffff !important;
    }
    .CalendarTab_date {
      color: #ffffff !important;
    }
    .CalendarTab_day {
      color: #ffffff !important;
    }
  }

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
    }
  }
`;
