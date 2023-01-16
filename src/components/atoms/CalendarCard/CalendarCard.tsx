import styled from 'styled-components';
import { categoryList } from '../../../constants/category.constant';
import { getYYYYMMDD } from '../../../utils/date.util';
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
import Link from 'next/link';
import useCalendarCard from '../../../hooks/useCalendarCard';

export function CalendarCard(props: { event: EventItem }) {
  const { event } = props;

  const newCalendarCard = useCalendarCard(event);

  return (
    <Wrapper
      className="ScheduleGameBox_game_box__23m0b"
      data-closed={newCalendarCard.status === 'COMPLETE'}
      data-emphasis={newCalendarCard.emphasis}
    >
      <div
        className="d-day"
        data-dday={newCalendarCard.dDay === newCalendarCard.TODAY}
      >
        {newCalendarCard.dDay}
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
      {newCalendarCard.check ? (
        <div className="content check">확인함</div>
      ) : (
        <div className="content">{event.summary}</div>
      )}
      <div className="sub-menu">
        <div>
          <Link href={`/edit/${event.id}`}>
            <HiOutlinePencil
              title="편집"
              id="EDIT"
              className="icon"
              size={24}
            />
          </Link>
          {newCalendarCard.hidden ? (
            <BsEyeSlash
              title="보이기"
              id="SHOW"
              className="icon"
              size={24}
              onClick={e => newCalendarCard.click(e)}
            />
          ) : (
            <BsEye
              title="숨기기"
              id="HIDE"
              className="icon"
              size={24}
              onClick={e => newCalendarCard.click(e)}
            />
          )}
          {newCalendarCard.emphasis ? (
            <BsExclamationCircleFill
              title="일반"
              id="NORMAL"
              className="icon"
              size={24}
              onClick={e => newCalendarCard.click(e)}
            />
          ) : (
            <BsExclamationCircle
              title="강조"
              id="BOLD"
              className="icon"
              size={24}
              onClick={e => {
                newCalendarCard.click(e);
              }}
            />
          )}
          {newCalendarCard.status === 'COMPLETE' ? (
            <GrFormAdd
              title="진행중"
              id="ONGOING"
              className="icon"
              size={24}
              onClick={e => newCalendarCard.click(e)}
            />
          ) : (
            <GrFormClose
              title="종료"
              id="COMPLETE"
              className="icon"
              size={24}
              onClick={e => newCalendarCard.click(e)}
            />
          )}
          {newCalendarCard.check ? (
            <BsBookmarkCheck
              title="미확인"
              id="UNCHECK"
              className="icon"
              size={24}
              onClick={e => newCalendarCard.click(e)}
            />
          ) : (
            <BsBookmark
              title="확인"
              id="CHECK"
              className="icon"
              size={24}
              onClick={e => newCalendarCard.click(e)}
            />
          )}
          <BsTrash
            title="휴지통"
            id="TRASH"
            className="icon"
            size={24}
            onClick={e => newCalendarCard.click(e)}
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
