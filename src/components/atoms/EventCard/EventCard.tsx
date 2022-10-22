import styled from 'styled-components';
import stores from '../../../store/configureStore';
import { editActions } from '../../../store/modules/actions/edit.action';
import { menuActions } from '../../../store/modules/actions/menu.action';
import { modalActions } from '../../../store/modules/actions/modal.action';

export function EventCard(props: { event: EventItem }) {
  const { event } = props;
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
        <div
          aria-hidden
          onClick={e => {
            e.stopPropagation();
            stores.dispatch(editActions.setEditId({ editId: event.id }));
            stores.dispatch(menuActions.setMode({ mode: 'EDIT' }));
          }}
        >
          편집
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
