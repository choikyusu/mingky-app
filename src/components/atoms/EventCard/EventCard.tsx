import { useState } from 'react';
import styled from 'styled-components';
import stores from '../../../store/configureStore';
import { editActions } from '../../../store/modules/actions/edit.action';
import { eventActions } from '../../../store/modules/actions/event.action';
import { menuActions } from '../../../store/modules/actions/menu.action';
import { modalActions } from '../../../store/modules/actions/modal.action';

export function EventCard(props: { event: EventItem }) {
  const { event } = props;
  const [status, setStatus] = useState<string>(event.status);
  const [hidden, setHidden] = useState<boolean>(event.hidden);
  const [bold, setBold] = useState<boolean>(event.bold);
  const [check, setCheck] = useState<boolean>(event.check);

  return (
    <Wrapper>
      <div
        className="card"
        aria-hidden
        onClick={() =>
          stores.dispatch(
            modalActions.setDialogStatus({
              id: 'EVENT',
              data: { event },
            }),
          )
        }
      >
        <div className="event-list">{event.name}</div>
        <div>{`${event.summary}...`}</div>
        <div
          aria-hidden
          onClick={e => {
            e.stopPropagation();
            stores.dispatch(editActions.setEditId({ editId: event.id }));
            stores.dispatch(editActions.setContents({ contents: '' }));
            stores.dispatch(menuActions.setMode({ mode: 'EDIT' }));
          }}
        >
          편집
        </div>
        <div
          aria-hidden
          onClick={e => {
            e.stopPropagation();
            setHidden(!hidden);
            const newEvent = { ...event, hidden: !hidden };
            stores.dispatch(eventActions.updateEventItem({ event: newEvent }));
          }}
        >
          {hidden ? '숨김' : '보임'}{' '}
        </div>
        <div
          aria-hidden
          onClick={e => {
            e.stopPropagation();
            setBold(!bold);
            const newEvent = { ...event, bold: !bold };
            stores.dispatch(eventActions.updateEventItem({ event: newEvent }));
          }}
        >
          {bold ? '강조' : '일반'}{' '}
        </div>
        <div
          aria-hidden
          onClick={e => {
            e.stopPropagation();
            setCheck(!check);
            const newEvent = { ...event, check: !check };
            stores.dispatch(eventActions.updateEventItem({ event: newEvent }));
          }}
        >
          {check ? '미확인' : '확인함'}{' '}
        </div>
        <div
          aria-hidden
          onClick={e => {
            e.stopPropagation();

            const nextStatus = status === 'COMPLETE' ? 'ONGOING' : 'COMPLETE';
            setStatus(nextStatus);
            const newEvent = { ...event, status: nextStatus };

            stores.dispatch(eventActions.updateEventItem({ event: newEvent }));
          }}
        >
          {status === 'COMPLETE' ? '완료' : '진행중'}{' '}
        </div>
      </div>
      <hr />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .card {
    width: 402px;
    height: 64px;
    display: flex;
    .title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #8c8a8a;
      margin-right: 10px;
    }
  }

  hr {
    border: 1px solid #c8c8c8;
  }
`;
