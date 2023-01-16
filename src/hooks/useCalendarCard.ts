import { useState } from 'react';
import { toast } from 'react-toastify';
import { getToday, getYYYYMMDD } from '../utils/date.util';

export default function useCalendarCard(event: EventItem) {
  const TODAY = 'Today';

  const [status, setStatus] = useState<string>(event.status);
  const [hidden, setHidden] = useState<boolean>(event.hidden);
  const [emphasis, setEmphasis] = useState<boolean>(event.bold);
  const [check, setCheck] = useState<boolean>(event.check);

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

  const click = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const icon = e.currentTarget as SVGElement;
    e.stopPropagation();
    switch (icon.id) {
      case 'SHOW':
      case 'HIDE':
        {
          const newEvent = { ...event, hidden: !hidden };
          setHidden(!hidden);
          if (hidden) toast('이벤트가 보입니다.');
          else toast('이벤트가 보이지 않습니다.');
        }
        break;
      case 'BOLD':
      case 'NORMAL':
        {
          const newEvent = { ...event, bold: !emphasis };
          setEmphasis(!emphasis);
          if (emphasis) toast('이벤트를 강조하지않습니다.');
          else toast('이벤트를 강조합니다.');
        }
        break;
      case 'ONGOING':
      case 'COMPLETE':
        {
          const nextStatus = status === 'COMPLETE' ? 'ONGOING' : 'COMPLETE';
          setStatus(nextStatus);
          const newEvent = { ...event, status: nextStatus };
          setStatus(nextStatus);
          if (status === 'COMPLETE') toast('이벤트가 진행중입니다.');
          else toast('이벤트가 조기종료되었습니다.');
        }
        break;
      case 'CHECK':
      case 'UNCHECK':
        {
          const newEvent = { ...event, check: !check };
          setCheck(!check);
          if (check) toast('이벤트를 아직 미확인했습니다.');
          else toast('이벤트를 확인했습니다.');
        }
        break;
      default:
        break;
    }
  };

  return { status, emphasis, dDay, TODAY, check, hidden, click };
}
