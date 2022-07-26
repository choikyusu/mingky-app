import styled from 'styled-components';
import { EventCategoryIcon } from '../../../atoms/EventCategoryIcon/EventCategoryIcon';
import { BiCoffeeTogo } from 'react-icons/bi';
import {
  BsCashStack,
  BsCreditCard2Back,
  BsCoin,
  BsHouseDoor,
} from 'react-icons/bs';
import { FiMonitor, FiGift } from 'react-icons/fi';
import { IoFastFoodOutline } from 'react-icons/io5';
import store, { RootState } from '../../../../store/configureStore';
import { useSelector } from 'react-redux';
import { NaverLogin } from '../../../modules/NaverLogin/NaverLogin';

export function SettingsBody() {
  return (
    <Wrapper>
      <NaverLogin />
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
