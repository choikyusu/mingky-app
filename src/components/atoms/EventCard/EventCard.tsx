import styled from 'styled-components';

export function EventCard(props: { event: EventItem }) {
  const { event } = props;
  return (
    <Wrapper>
      <div className="card">
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
