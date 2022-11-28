import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import stores, { RootState } from '../../../../store/configureStore';
import { useSelector } from 'react-redux';
import { getToday } from '../../../../utils/date.util';
import { modalActions } from '../../../../store/modules/actions/modal.action';
import { eventActions } from '../../../../store/modules/actions/event.action';
import { API } from '../../../../constants/api.constant';
import useFetch from '../../../../hooks/useFetch';

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
      <Content>
        <div className="content_area" role="tabpanel">
          <div className="ScheduleAllType_container__1TcBO">
            <div
              className="ScheduleAllType_game_list_wrap__3ONB1"
              id="date_2022-11-22"
            >
              <div className="ScheduleAllType_game_date__1B_hR">
                <em className="ScheduleAllType_date__1NfTN">11.22</em>
                <span>화</span>
              </div>
              <div className="game_box_list">
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 A조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4739.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            세네갈
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            1승 0무 1패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4705.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            네덜란드
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 1무 0패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">세네갈 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">네덜란드 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            2
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211221632986721"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">세네갈 득점 정보</span>
                        <ul className="history_list" />
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">네덜란드 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              각포
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>84’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              클라센
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>90+9’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 B조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4724.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            미국
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            0승 2무 0패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4702.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            웨일스
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            0승 1무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">미국 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            1
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">웨일스 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            1
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211221632986733"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">미국 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              웨아
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>36’
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">웨일스 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              베일
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>82’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 C조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4819.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            아르헨티나
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            1승 0무 1패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/8022.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            사우디아라비아
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 0무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">아르헨티나 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            1
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">사우디아라비아 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            2
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211221632986743"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">아르헨티나 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              메시
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>10’
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">사우디아라비아 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              알 세흐리
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>48’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              알 다우사리
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>53’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 D조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4476.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            덴마크
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            0승 1무 1패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4729.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            튀니지
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            0승 1무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">덴마크 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">튀니지 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211221632986757"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ScheduleAllType_game_list_wrap__3ONB1"
              id="date_2022-11-23"
            >
              <div className="ScheduleAllType_game_date__1B_hR">
                <em className="ScheduleAllType_date__1NfTN">11.23</em>
                <span>수</span>
              </div>
              <div className="game_box_list">
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 C조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4781.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            멕시코
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            0승 1무 1패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4703.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            폴란드
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 1무 0패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">멕시코 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">폴란드 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211231632986745"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 D조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4481.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            프랑스
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            2승 0무 0패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/7317.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            호주
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 0무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">프랑스 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            4
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">호주 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            1
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211231632986755"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">프랑스 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              라비오
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>27’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              지루
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>32’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              음바페
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>68’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              지루
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>71’
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">호주 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              굿윈
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>9’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 F조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4778.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            모로코
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            1승 1무 0패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4715.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            크로아티아
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 1무 0패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">모로코 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">크로아티아 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211231632986781"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 E조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4711.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            독일
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            0승 1무 1패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/6736.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            일본
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 0무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">독일 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            1
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">일본 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            2
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211231632986769"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">독일 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              귄도안
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>33’
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">일본 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              도안
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>75’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              타쿠마
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>83’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ScheduleAllType_game_list_wrap__3ONB1"
              id="date_2022-11-25"
            >
              <div className="ScheduleAllType_game_date__1B_hR">
                <em className="ScheduleAllType_date__1NfTN">11.25</em>
                <span>금</span>
              </div>
              <div className="game_box_list">
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 H조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4704.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            포르투갈
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            1승 0무 0패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4764.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            가나
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            0승 0무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">포르투갈 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            3
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">가나 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            2
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211251632986803"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">포르투갈 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              호날두
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>65’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              주앙 펠릭스
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>78’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              레앙
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>80’
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">가나 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              아예우
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>73’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              부카리
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>89’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 G조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4748.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            브라질
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            1승 0무 0패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/6355.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            세르비아
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            0승 0무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">브라질 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            2
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">세르비아 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211251632986791"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">브라질 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              히샬리송
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>62’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              히샬리송
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>73’
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">세르비아 득점 정보</span>
                        <ul className="history_list" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 B조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4702.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            웨일스
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            0승 1무 1패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/8111.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            이란
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 0무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">웨일스 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">이란 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            2
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211251632986737"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">웨일스 득점 정보</span>
                        <ul className="history_list" />
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">이란 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              체시미
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>90+8’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              레자에이안
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>90+11’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 A조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/37314.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            카타르
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            0승 0무 2패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4739.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            세네갈
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 0무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">카타르 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            1
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">세네갈 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            3
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211251632986723"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">카타르 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              문타리
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>78’
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">세네갈 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              디아
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>41’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              디에디우
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>48’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              밤바 디엥
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>84’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ScheduleAllType_game_list_wrap__3ONB1"
              id="date_2022-11-26"
            >
              <div className="ScheduleAllType_game_date__1B_hR">
                <em className="ScheduleAllType_date__1NfTN">11.26</em>
                <span>토</span>
              </div>
              <div className="game_box_list">
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 A조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4705.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            네덜란드
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            1승 1무 0패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4757.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            에콰도르
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 1무 0패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">네덜란드 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            1
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">에콰도르 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            1
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211261632986725"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">네덜란드 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              각포
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>6’
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">에콰도르 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              발렌시아
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>49’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 B조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4713.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            잉글랜드
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            1승 1무 0패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4724.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            미국
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            0승 2무 0패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">잉글랜드 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">미국 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211261632986735"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 D조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4729.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            튀니지
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            0승 1무 1패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/7317.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            호주
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 0무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">튀니지 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">호주 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            1
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211261632986761"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">튀니지 득점 정보</span>
                        <ul className="history_list" />
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">호주 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              듀크
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>23’
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ScheduleGameBox_game_box__23m0b type_end">
                  <em className="ScheduleGameBox_game_info__2Iapg">
                    조별리그 C조
                  </em>
                  <div className="ScheduleGameBox_game_area__1P_Vw">
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/4703.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            폴란드
                          </strong>
                          <em className="ScheduleGameBox_record__2Xccw">
                            1승 1무 0패
                          </em>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_team__2GUFA">
                      <div className="ScheduleGameBox_team_info__37GDT">
                        <div className="ScheduleGameBox_emblem__29igf">
                          <img
                            src="https://sports-phinf.pstatic.net/team/qatar2022/default/8022.png"
                            alt=""
                            width="52"
                            height="52"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ScheduleGameBox_name_wrap__3lbZB">
                          <strong className="ScheduleGameBox_name__3QDbf">
                            사우디아라비아
                          </strong>
                          <div className="ScheduleGameBox_record__2Xccw">
                            1승 0무 1패
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ScheduleGameBox_game_result__1AVpS">
                      <strong className="ScheduleGameBox_score_info__SQ6TF">
                        <span className="ScheduleGameBox_score__2dQyL ScheduleGameBox_type_winner__thbWy">
                          <span className="blind">폴란드 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            2
                          </span>
                        </span>
                        <span className="ScheduleGameBox_vs__2aK93">
                          <span className="blind">vs</span>
                        </span>
                        <span className="ScheduleGameBox_score__2dQyL">
                          <span className="blind">사우디아라비아 스코어</span>
                          <span className="ScheduleGameBox_number__3T3_C">
                            0
                          </span>
                        </span>
                      </strong>
                      <em className="ScheduleGameBox_status__LQyL-">
                        <span className="ScheduleGameBox_text__2RCBe">
                          경기종료
                        </span>
                      </em>
                      <div className="ScheduleGameBox_game_link_wrap__338tc">
                        <a
                          href="/game/202211261632986749"
                          className="CommonGameLink_link_game__N1L0x CommonGameLink_type_end__1DnX1"
                        >
                          <span className="CommonGameLink_text__1Y1Ae">
                            경기영상
                            <svg
                              width="6"
                              height="9"
                              viewBox="0 0 6 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="CommonGameLink_icon_arrow__aiXSQ"
                            >
                              <path
                                d="M1 1l3.387 3.519L1.036 8"
                                stroke="#20B5AA"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ScheduleGameBox_score_history_area__-JA6H">
                    <div className="ScheduleGameBox_history_container__1Fy2m">
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">폴란드 득점 정보</span>
                        <ul className="history_list">
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              지엘린스키
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>39’
                            </div>
                          </li>
                          <li className="ScheduleGameBox_item__3YLqy">
                            <div className="ScheduleGameBox_player__2byc9">
                              레반도프스키
                            </div>
                            <div className="ScheduleGameBox_time__9gYhV">
                              <span className="blind">득점 시간</span>82’
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="ScheduleGameBox_score_history__2GdwX">
                        <span className="blind">사우디아라비아 득점 정보</span>
                        <ul className="history_list" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Wrapper>
  );
}

const Content = styled.div`
  padding-top: 0px;
  .content_area {
    flex-direction: column;
    .ScheduleAllType_container__1TcBO {
      padding: 15px 20px 30px;
      .ScheduleAllType_game_list_wrap__3ONB1 {
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
      }
    }
  }
`;

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
