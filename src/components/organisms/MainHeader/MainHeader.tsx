import styled from 'styled-components';
import { Icon } from '../../atoms/Icon/Icon';

export function MainHeader() {
  return (
    <Wrapper>
      <div className="icons">
        <Icon icon="fa-house" />
        <Icon icon="fa-calendar" />
        <Icon icon="fa-bars" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  .icons {
    display: flex;
  }
`;
