import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import stores, { RootState } from '../../../../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { getToday, isSameDate } from '../../../../utils/date.util';
import { modalActions } from '../../../../store/modules/actions/modal.action';
import { eventActions } from '../../../../store/modules/actions/event.action';
import { API } from '../../../../constants/api.constant';
import useFetch from '../../../../hooks/useFetch';
import { CalendarMenu } from '../../../molecules/CalendarTab/CalendarTab';
import { CalendarContentArea } from '../../../molecules/CalendarContentArea/CalendarContentArea';

export function CalendarBody() {
  const dispatch = useDispatch();
  const dayCardRefList: React.MutableRefObject<HTMLDivElement | null>[] = [];
  const dayButtonRefList: React.MutableRefObject<HTMLButtonElement | null>[] =
    [];
  const eventList: { [id: string]: EventItem } = useSelector(
    (state: RootState) => state.event.eventList,
  );
  const [dayList, setDayList] = useState<
    { date: Date; eventList: EventItem[] }[]
  >([]);
  const newFetch = useFetch();

  useEffect(() => {
    (async () => {
      const resultData: { events: EventItem[] } = await newFetch.callApi({
        method: 'get',
        url: API.GET_EVENTS_LIST,
      });

      if (resultData) {
        const { events } = resultData;

        events.forEach(event => {
          event.startDate = new Date(event.startDate);
          event.endDate = new Date(event.endDate);
        });

        dispatch(eventActions.setEventItem({ eventList: events }));
      }
    })();
  }, []);

  useEffect(() => {
    const list: { date: Date; eventList: EventItem[] }[] = [];
    for (let i = -10; i < 10; i++) {
      const today = getToday();
      const dateEvent: {
        date: Date;
        eventList: EventItem[];
      } = {
        date: new Date(today.setDate(today.getDate() + i)),
        eventList: [],
      };

      Object.values(eventList).forEach(item => {
        if (isSameDate(item.startDate, dateEvent.date)) {
          dateEvent.eventList.push(item);
        }
      });

      list.push(dateEvent);
    }

    setDayList([...list]);
  }, [eventList]);

  const mouseMove = (e: TouchEvent | MouseEvent) => {
    const event = e instanceof TouchEvent ? e.touches[0] : e;

    if (mouseDown && flickCameraRef.current) {
      const camera = flickCameraRef.current;
      camera.style.transform = `translate3d(${
        cameraPosition.clientX + (event.clientX - clientPosition.clientX)
      }px, 0px, 0px)`;
    }
  };

  const mouseUp = (e: TouchEvent | MouseEvent) => {
    const event = e instanceof TouchEvent ? e.changedTouches[0] : e;
    setMouseDown(false);

    let clientX = 0;
    const width = flickCameraRef.current?.scrollWidth || 0;
    const viewPortWidth = window.visualViewport?.width || 0;
    if (cameraPosition.clientX + (event.clientX - clientPosition.clientX) > 0) {
      clientX = 0;
    } else if (
      cameraPosition.clientX +
        (event.clientX - clientPosition.clientX) +
        width -
        viewPortWidth <
      0
    ) {
      clientX = -width + viewPortWidth - 40;
    } else {
      clientX =
        cameraPosition.clientX + (event.clientX - clientPosition.clientX);
    }

    if (mouseDown && flickCameraRef.current) {
      const camera = flickCameraRef.current;
      camera.style.transform = `translate3d(${clientX}px, 0px, 0px)`;
    }

    if (Math.abs(event.clientX - clientPosition.clientX) < 3)
      setIsMouseClick(true);

    setCameraPosition({
      clientX,
      clientY: 0,
    });
  };

  const [isFixed, setIsFixed] = useState(false);

  const scroll = () => {
    if (!isFixed && window.scrollY >= 130) setIsFixed(true);
    else if (isFixed && window.scrollY < 41) setIsFixed(false);
  };

  useEffect(() => {
    window.document.addEventListener('mousemove', mouseMove);
    window.document.addEventListener('mouseup', mouseUp);
    window.document.addEventListener('touchmove', mouseMove);
    window.document.addEventListener('touchend', mouseUp);
    window.document.addEventListener('scroll', scroll);
    return () => {
      window.document.removeEventListener('mousemove', mouseMove);
      window.document.removeEventListener('mouseup', mouseUp);
      window.document.removeEventListener('touchmove', mouseMove);
      window.document.removeEventListener('touchend', mouseUp);
      window.document.removeEventListener('scroll', scroll);
    };
  }, [mouseMove]);

  const flickCameraRef: React.MutableRefObject<HTMLUListElement | null> =
    useRef(null);

  const [mouseDown, setMouseDown] = useState(false);
  const [isMouseClick, setIsMouseClick] = useState(false);
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
      <CalendarMenu
        isFixed={isFixed}
        setMouseDown={setMouseDown}
        isMouseClick={isMouseClick}
        setIsMouseClick={setIsMouseClick}
        setClientPosition={setClientPosition}
        flickCameraRef={flickCameraRef}
        dayList={dayList}
        dayCardRefList={dayCardRefList}
        dayButtonRefList={dayButtonRefList}
        setCameraPosition={setCameraPosition}
      />
      <CalendarContentArea dayList={dayList} dayCardRefList={dayCardRefList} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  text-align: center;
  justify-content: center;

  ul {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 1.25;
  }
`;
