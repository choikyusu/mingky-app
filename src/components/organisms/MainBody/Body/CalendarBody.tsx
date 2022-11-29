import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import stores, { RootState } from '../../../../store/configureStore';
import { useSelector } from 'react-redux';
import { getToday } from '../../../../utils/date.util';
import { modalActions } from '../../../../store/modules/actions/modal.action';
import { eventActions } from '../../../../store/modules/actions/event.action';
import { API } from '../../../../constants/api.constant';
import useFetch from '../../../../hooks/useFetch';
import { CalendarCard } from './CalendarCard';

export function CalendarBody() {
  // const eventList: { [id: string]: EventItem } = useSelector(
  //   (state: RootState) => state.event.eventList,
  // );
  // const [dayList, setDayList] = useState<
  //   { date: Date; eventList: EventItem[] }[]
  // >([]);
  // const datePlusOffset = useRef<number>(0);
  // const dateMinusOffset = useRef<number>(0);

  // const dayRef: React.MutableRefObject<HTMLTableCellElement | null> =
  //   useRef(null);
  // const listRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  // const newFetch = useFetch();

  // useEffect(() => {
  //   (async () => {
  //     const resultData: { events: EventItem[] } = await newFetch.callApi({
  //       method: 'get',
  //       url: API.GET_EVENTS_LIST,
  //     });

  //     if (resultData) {
  //       const { events } = resultData;

  //       events.forEach(event => {
  //         event.startDate = new Date(event.startDate);
  //         event.endDate = new Date(event.endDate);
  //       });

  //       stores.dispatch(eventActions.setEventItem({ eventList: events }));
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   const list: { date: Date; eventList: EventItem[] }[] = [];
  //   for (let i = 0; i < 15; i++) {
  //     const today = getToday();
  //     const dateEvent: {
  //       date: Date;
  //       eventList: EventItem[];
  //     } = {
  //       date: new Date(today.setDate(today.getDate() + i)),
  //       eventList: [],
  //     };

  //     Object.values(eventList).forEach(item => {
  //       if (
  //         item.startDate <= dateEvent.date &&
  //         dateEvent.date <= item.endDate
  //       ) {
  //         dateEvent.eventList.push(item);
  //       }
  //     });

  //     list.push(dateEvent);
  //   }

  //   datePlusOffset.current = 14;

  //   setDayList([...list]);
  // }, [eventList]);

  // const onScroll = (e: any) => {
  //   const { scrollTop, scrollHeight, clientHeight } = e.target;
  //   // console.log(scrollTop, scrollHeight, clientHeight);

  //   if (scrollTop === 0) {
  //     const list: { date: Date; eventList: EventItem[] }[] = [];
  //     for (let i = 0; i < 5; i++) {
  //       const today = getToday();
  //       const dateEvent: {
  //         date: Date;
  //         eventList: EventItem[];
  //       } = {
  //         date: new Date(
  //           today.setDate(today.getDate() - dateMinusOffset.current - i),
  //         ),
  //         eventList: [],
  //       };

  //       Object.values(eventList).forEach(item => {
  //         if (
  //           item.startDate <= dateEvent.date &&
  //           dateEvent.date <= item.endDate
  //         ) {
  //           dateEvent.eventList.push(item);
  //         }
  //       });

  //       list.push(dateEvent);
  //     }

  //     dateMinusOffset.current += 5;

  //     setDayList([...list.reverse(), ...dayList]);

  //     listRef.current?.scrollTo({ top: 400 });
  //   }

  //   if (scrollTop + clientHeight === scrollHeight) {
  //     const list: { date: Date; eventList: EventItem[] }[] = [];
  //     for (let i = 1; i < 6; i++) {
  //       const today = getToday();
  //       const dateEvent: {
  //         date: Date;
  //         eventList: EventItem[];
  //       } = {
  //         date: new Date(
  //           today.setDate(today.getDate() + datePlusOffset.current + i),
  //         ),
  //         eventList: [],
  //       };

  //       Object.values(eventList).forEach(item => {
  //         if (
  //           item.startDate <= dateEvent.date &&
  //           dateEvent.date <= item.endDate
  //         ) {
  //           dateEvent.eventList.push(item);
  //         }
  //       });

  //       list.push(dateEvent);
  //     }

  //     datePlusOffset.current += 5;

  //     setDayList([...dayList, ...list]);
  //   }
  // };
  // useEffect(() => {
  //   listRef?.current?.addEventListener('scroll', onScroll);
  //   return () => {
  //     listRef?.current?.removeEventListener('scroll', onScroll);
  //   };
  // }, [onScroll]);

  const mouseMove = (e: MouseEvent) => {
    if (mouseDown && flickCameraRef.current) {
      const camera = flickCameraRef.current;
      camera.style.transform = `translate3d(${
        cameraPosition.clientX + (e.clientX - clientPosition.clientX)
      }px, 0px, 0px)`;
    }
  };

  const mouseUp = (e: MouseEvent) => {
    setMouseDown(false);

    let clientX = 0;
    const width = flickCameraRef.current?.scrollWidth || 0;
    const viewPortWidth = window.visualViewport?.width || 0;
    if (cameraPosition.clientX + (e.clientX - clientPosition.clientX) > 0) {
      clientX = 0;
    } else if (
      cameraPosition.clientX +
        (e.clientX - clientPosition.clientX) +
        width -
        viewPortWidth <
      0
    ) {
      clientX = -width + viewPortWidth - 30;
    } else {
      clientX = cameraPosition.clientX + (e.clientX - clientPosition.clientX);
    }

    if (mouseDown && flickCameraRef.current) {
      const camera = flickCameraRef.current;
      camera.style.transform = `translate3d(${clientX}px, 0px, 0px)`;
    }

    setCameraPosition({
      clientX,
      clientY: 0,
    });
  };

  useEffect(() => {
    window.document.addEventListener('mousemove', mouseMove);
    window.document.addEventListener('mouseup', mouseUp);
    return () => {
      window.document.removeEventListener('mousemove', mouseMove);
      window.document.removeEventListener('mouseup', mouseUp);
    };
  });

  const flickCameraRef: React.MutableRefObject<HTMLUListElement | null> =
    useRef(null);

  const [mouseDown, setMouseDown] = useState(false);
  const [clientPosition, setClientPosition] = useState({
    clientX: 0,
    clientY: 0,
  });
  const [cameraPosition, setCameraPosition] = useState({
    clientX: 0,
    clientY: 0,
  });

  return (
    <Wrapper>
      <CandendarTab style={{ width: '100%' }}>
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
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '0px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">21</strong>
                        <span className="CalendarTab_day">월</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 2</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '73px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">22</strong>
                        <span className="CalendarTab_day">화</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '146px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">23</strong>
                        <span className="CalendarTab_day">수</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '219px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">24</strong>
                        <span className="CalendarTab_day">목</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="CalendarTab_icon_korea__3AAh6">
                      <span className="blind">대한민국 출전</span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '292px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">25</strong>
                        <span className="CalendarTab_day">금</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '365px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">26</strong>
                        <span className="CalendarTab_day">토</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '438px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">27</strong>
                        <span className="CalendarTab_day">일</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '511px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">28</strong>
                        <span className="CalendarTab_day">월</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="CalendarTab_icon_korea__3AAh6">
                      <span className="blind">대한민국 출전</span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '584px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">29</strong>
                        <span className="CalendarTab_day">화</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 2</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '657px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">11월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">30</strong>
                        <span className="CalendarTab_day">수</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '730px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">12월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">1</strong>
                        <span className="CalendarTab_day">목</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '803px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">12월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">2</strong>
                        <span className="CalendarTab_day">금</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '876px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">12월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">3</strong>
                        <span className="CalendarTab_day">토</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 4</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="CalendarTab_icon_korea__3AAh6">
                      <span className="blind">대한민국 출전</span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '949px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">12월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">4</strong>
                        <span className="CalendarTab_day">일</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 2</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '1022px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">12월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">5</strong>
                        <span className="CalendarTab_day">월</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 2</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
                <li
                  className="CalendarTab_tab_item eg-flick-panel"
                  role="presentation"
                  style={{ position: 'absolute', left: '1095px' }}
                >
                  <button
                    type="button"
                    className="CalendarTab_tab_button"
                    role="tab"
                    aria-selected="false"
                  >
                    <span className="CalendarTab_tab_text">
                      <span className="CalendarTab_month">12월</span>
                      <span className="CalendarTab_date_wrap">
                        <strong className="CalendarTab_date">6</strong>
                        <span className="CalendarTab_day">화</span>
                      </span>
                      <span className="CalendarTab_game_number">
                        <span className="blind">경기 수 2</span>
                        <span className="CalendarTab_mark" aria-hidden="true" />
                        <span className="CalendarTab_mark" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CandendarTab>
      <CalendarCard />
    </Wrapper>
  );
}

const CandendarTab = styled.div`
  z-index: 10000;
  background-color: #fff;
  position: fixed;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.6));
  .CalendarTab_inner {
    position: relative;
    margin: 0 auto;

    .CalendarTab_tab_list {
      overflow: hidden;
      padding: 16px 20px;
      boarder-bottom: 1px solid #ddd;

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

          .CalendarTab_tab_item {
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
                  .blind {
                    position: absolute;
                    clip: rect(0 0 0 0);
                    width: 1px;
                    height: 1px;
                    margin: -1px;
                    overflow: hidden;
                  }
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
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  text-align: center;
  justify-content: center;
`;
