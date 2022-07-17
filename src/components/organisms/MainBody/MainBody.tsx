import styled from 'styled-components';
import { EventCategoryIcon } from '../../atoms/EventCategoryIcon/EventCategoryIcon';
import { BiCoffeeTogo } from 'react-icons/bi';
import {
  BsCashStack,
  BsCreditCard2Back,
  BsCoin,
  BsHouseDoor,
} from 'react-icons/bs';
import { FiMonitor, FiGift } from 'react-icons/fi';
import { IoFastFoodOutline } from 'react-icons/io5';

export function MainBody() {
  return (
    <Wrapper>
      <div className="icons">
        <EventCategoryIcon icon={BiCoffeeTogo} />
        <EventCategoryIcon icon={BsCashStack} />
        <EventCategoryIcon icon={BsCreditCard2Back} />
        <EventCategoryIcon icon={BsCoin} />
        <EventCategoryIcon icon={FiMonitor} />
        <EventCategoryIcon icon={BsHouseDoor} />
        <EventCategoryIcon icon={FiGift} />
        <EventCategoryIcon icon={IoFastFoodOutline} />
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
