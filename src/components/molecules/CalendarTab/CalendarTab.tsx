import { useRef } from 'react';
import styled from 'styled-components';
import { CalendarTabItem } from '../../atoms/CalendarTabItem/CalendarTabItem';

export function CalendarMenu(props: {
  isFixed: boolean;
  setMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  setClientPosition: React.Dispatch<
    React.SetStateAction<{
      clientX: number;
      clientY: number;
    }>
  >;
  flickCameraRef: React.MutableRefObject<HTMLUListElement | null>;
  dayList: {
    date: Date;
    eventList: EventItem[];
  }[];
  dayCardRefList: React.MutableRefObject<HTMLDivElement | null>[];
}) {
  const {
    isFixed,
    setMouseDown,
    setClientPosition,
    flickCameraRef,
    dayList,
    dayCardRefList,
  } = props;

  return (
    <CaldendarTab isFixed={isFixed}>
      <div className="CalendarTab_inner">
        <div className="CalendarTab_tab_list" role="tablist">
          <div
            className="eg-flick-viewport"
            onMouseDown={e => {
              setMouseDown(true);
              setClientPosition({ clientX: e.clientX, clientY: e.clientY });
            }}
            aria-hidden
          >
            <ul ref={flickCameraRef} className="eg-flick-camera">
              {dayList.map((day, idx) => (
                <CalendarTabItem
                  day={day}
                  index={idx}
                  dayCardRefList={dayCardRefList}
                  isFixed={isFixed}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </CaldendarTab>
  );
}

const CaldendarTab = styled.div<{ isFixed: boolean }>`
  z-index: 10000;
  background-color: #fff;
  ${props => (props.isFixed ? 'position: fixed;' : '')}
  ${props =>
    props.isFixed ? 'filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.6));' : ''}
  ${props => (props.isFixed ? ' top: 0;' : '')}
 
  width: 100%;
  .CalendarTab_inner {
    position: relative;
    margin: 0 auto;

    .CalendarTab_tab_list {
      overflow: hidden;
      padding: 16px 20px;
      border-bottom: 1px solid #ddd;

      .eg-flick-viewport {
        position: relative;
        z-index: 0;
        overflow: visible;
        min-height: 100%;
        user-select: none;
        user-darg: none;
        height: 64px;
        .eg-flick-camera {
          width: 100%;
          height: 100%;
          well-change: transform;
          transform: translate3d(0px, 0px, 0px);
        }
      }
    }
  }
`;
