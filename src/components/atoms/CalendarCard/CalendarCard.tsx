import styled from 'styled-components';

export function CalendarCard(props: { event: EventItem }) {
  const { event } = props;
  return (
    <Wrapper className="ScheduleGameBox_game_box__23m0b">
      <div className="icon">
        <div>{event.category}</div>
      </div>
      <strong className="title">{event.nameText}</strong>
      <div className="content">{event.summary}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &.ScheduleGameBox_game_box__23m0b {
    &.ScheduleGameBox_game_box__23m0b {
      margin-top: 10px;
    }

    padding: 24px;
    justify-content: left;
    text-align: left;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--color-schedule-box-border);
    background-color: var(--color-schedule-box);

    .icon {
      top: 0;
      right: 0;
      padding: 4px;
      border-radius: 0 0 0 20px;
      background-color: #c8c8c8;
      position: absolute;
    }

    .title {
      font-size: 28px;
    }
    .content {
      margin-top: 14px;
    }
  }
`;
