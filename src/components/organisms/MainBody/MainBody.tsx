import { RootState } from '../../../store/configureStore';
import { useSelector } from 'react-redux';
import { HomeBody } from './Body/HomeBody';
import { SettingsBody } from './Body/SettingsBody';
import { CalendarBody } from './Body/CalendarBody';
import { AdminBody } from './Body/AdminBody';

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
    case 'ADMIN_MENU':
      return <AdminBody />;
    default:
      return <div />;
  }
}
