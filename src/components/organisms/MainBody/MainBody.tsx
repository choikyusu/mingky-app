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
import store, { RootState } from '../../../store/configureStore';
import { useSelector } from 'react-redux';
import { HomeBody } from './Body/HomeBody';
import { SettingsBody } from './Body/SettingsBody';
import { CalendarBody } from './Body/CalendarBody';

export function MainBody() {
  const selectedMenu = useSelector(
    (state: RootState) => state.menu.selectedMenu,
  );

  switch (selectedMenu) {
    case 'HOME_MENU':
      return <HomeBody />;
    case 'CALENDAR_MENU':
      return <CalendarBody />;
    case 'SETTINGS_MENU':
      return <SettingsBody />;
    default:
      return <div />;
  }
}
