type MenuType =
  | HomeMenuType
  | CalendarMenuType
  | SettingsMenuType
  | AdminMenuType;

type HomeMenuType = 'HOME_MENU';
type CalendarMenuType = 'CALENDAR_MENU';
type SettingsMenuType = 'SETTINGS_MENU';
type AdminMenuType = 'ADMIN_MENU';

type SettingsMenu = {
  id: number;
  title: string;
  subTitle: string;
  linkType: () => IconType;
  doClick?: () => void;
};
