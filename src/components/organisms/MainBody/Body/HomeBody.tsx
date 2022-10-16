import styled from 'styled-components';
import { EventCategoryIcon } from '../../../atoms/EventCategoryIcon/EventCategoryIcon';

import { GrInfo, GrLike } from 'react-icons/gr';
import { FaPiggyBank } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';

export function HomeBody() {
  return (
    <Wrapper>
      <div className="icons">
        <EventCategoryIcon icon={GiReceiveMoney} title="절약" />
        <EventCategoryIcon icon={FaPiggyBank} title="부수입" />
        <EventCategoryIcon icon={GrLike} title="추첨" />
        <EventCategoryIcon icon={GrInfo} title="꿀팁" />
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
    flex-wrap: wrap;
  }
`;
