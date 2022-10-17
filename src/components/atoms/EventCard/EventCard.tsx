import styled from 'styled-components';
import stores from '../../../store/configureStore';
import { modalActions } from '../../../store/modules/actions/modal.action';

export function EventCard(props: { event: EventItem }) {
  const { event } = props;
  return (
    <Wrapper>
      <div
        className="card"
        role="button"
        tabIndex={0}
        onMouseDown={() =>
          stores.dispatch(
            modalActions.setDialogStatus({
              id: 'EVENT',
              data: { event },
            }),
          )
        }
      >
        <div className="event-list">{event.name}</div>
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
