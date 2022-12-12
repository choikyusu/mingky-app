import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { categoryList } from '../../../constants/category.constant';
import { editActions } from '../../../store/modules/actions/edit.action';
import { eventActions } from '../../../store/modules/actions/event.action';
import { menuActions } from '../../../store/modules/actions/menu.action';
import { getToday, getYYYYMMDD } from '../../../utils/date.util';
import { toast } from 'react-toastify';
import { HiOutlinePencil } from 'react-icons/hi';
import { GrFormAdd, GrFormClose } from 'react-icons/gr';
import {
  BsEye,
  BsEyeSlash,
  BsBookmark,
  BsBookmarkCheck,
  BsExclamationCircle,
  BsExclamationCircleFill,
  BsTrash,
} from 'react-icons/bs';

const TODAY = 'Today';

export function CalendarCard(props: { event: EventItem }) {
  const dispatch = useDispatch();
  const { event } = props;

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
    console.log('click', icon.id, emphasis);
    switch (icon.id) {
      case 'EDIT':
        dispatch(editActions.setEditId({ editId: event.id }));
        dispatch(editActions.setContents({ title: '', contents: '' }));
        dispatch(menuActions.setMode({ mode: 'EDIT' }));
        break;
      case 'SHOW':
      case 'HIDE':
        {
          const newEvent = { ...event, hidden: !hidden };
          dispatch(eventActions.updateEventItem({ event: newEvent }));
          setHidden(!hidden);
          if (hidden) toast('이벤트가 보입니다.');
          else toast('이벤트가 보이지 않습니다.');
        }
        break;
      case 'BOLD':
      case 'NORMAL':
        {
          const newEvent = { ...event, bold: !emphasis };
          dispatch(eventActions.updateEventItem({ event: newEvent }));
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
          dispatch(eventActions.updateEventItem({ event: newEvent }));
          setStatus(nextStatus);
          if (status === 'COMPLETE') toast('이벤트가 진행중입니다.');
          else toast('이벤트가 조기종료되었습니다.');
        }
        break;
      case 'CHECK':
      case 'UNCHECK':
        {
          const newEvent = { ...event, check: !check };
          dispatch(eventActions.updateEventItem({ event: newEvent }));
          setCheck(!check);
          if (check) toast('이벤트를 아직 미확인했습니다.');
          else toast('이벤트를 확인했습니다.');
        }
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper
      className="ScheduleGameBox_game_box__23m0b"
      data-closed={status === 'COMPLETE'}
      data-emphasis={emphasis}
    >
      {/* <div className="icon">
        <div>{event.category}</div>
      </div> */}
      <div className="d-day" data-dday={dDay === TODAY}>
        {dDay}
      </div>
      <div>
        <div className="category">
          {
            categoryList.list.find(category => category.id === event.category)
              ?.name
          }
        </div>
        <strong className="title">{event.nameText}</strong>
        <div className="date">
          {getYYYYMMDD(event.startDate)}
          {getYYYYMMDD(event.startDate) !== getYYYYMMDD(event.endDate)
            ? ` ~ ${getYYYYMMDD(event.endDate)}`
            : ''}
        </div>
      </div>
      {check ? (
        <div className="content check">확인함</div>
      ) : (
        <div className="content">{event.summary}</div>
      )}
      <div className="sub-menu">
        <div>
          <HiOutlinePencil
            title="편집"
            id="EDIT"
            className="icon"
            size={24}
            onClick={e => click(e)}
          />
          {hidden ? (
            <BsEyeSlash
              title="보이기"
              id="SHOW"
              className="icon"
              size={24}
              onClick={e => click(e)}
            />
          ) : (
            <BsEye
              title="숨기기"
              id="HIDE"
              className="icon"
              size={24}
              onClick={e => click(e)}
            />
          )}
          {emphasis ? (
            <BsExclamationCircleFill
              title="일반"
              id="NORMAL"
              className="icon"
              size={24}
              onClick={e => click(e)}
            />
          ) : (
            <BsExclamationCircle
              title="강조"
              id="BOLD"
              className="icon"
              size={24}
              onClick={e => {
                click(e);
                console.log('b');
              }}
            />
          )}
          {status === 'COMPLETE' ? (
            <GrFormAdd
              title="진행중"
              id="ONGOING"
              className="icon"
              size={24}
              onClick={e => click(e)}
            />
          ) : (
            <GrFormClose
              title="종료"
              id="COMPLETE"
              className="icon"
              size={24}
              onClick={e => click(e)}
            />
          )}
          {check ? (
            <BsBookmarkCheck
              title="미확인"
              id="UNCHECK"
              className="icon"
              size={24}
              onClick={e => click(e)}
            />
          ) : (
            <BsBookmark
              title="확인"
              id="CHECK"
              className="icon"
              size={24}
              onClick={e => click(e)}
            />
          )}
          <BsTrash
            title="휴지통"
            id="TRASH"
            className="icon"
            size={24}
            onClick={e => click(e)}
          />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &[data-closed='true'] {
    &:after {
      content: '';
      position: absolute;
      width: 200%;
      height: 200%;
      top: -100%;
      bottom: -100%;
      background-image: url('closed.png');
      transform: rotate(-30deg);
      opacity: 0.3;
    }
  }

  &[data-emphasis='true'] {
    border: 1px solid #cd1039 !important;
    background-color: #ffe6eb !important;
  }

  &.ScheduleGameBox_game_box__23m0b {
    &.ScheduleGameBox_game_box__23m0b {
      margin-top: 10px;
    }

    padding: 24px 24px 8px 24px;
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

    // .icon {
    //   top: 0;
    //   right: 0;
    //   padding: 4px;
    //   border-radius: 0 0 0 20px;
    //   background-color: #c8c8c8;
    //   position: absolute;
    // }

    .category {
      color: #868be6;
      font-weight: 800;
      font-size: 16px;
      margin-bottom: 4px;
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
      color: #4d4c4c;

      &:before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-top: 1px solid #cccccc;
        content: '';
      }

      &.check {
        font-weight: 800;
        color: #b22222;
      }
    }

    .sub-menu {
      z-index: 5;
      margin-top: 16px;
      display: flex;
      position: relative;

      .icon {
        margin: 4px;
      }
    }
  }
`;
