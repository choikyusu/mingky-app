import { IconType } from 'react-icons';
import { BsAlarm } from 'react-icons/bs';
import { LabelButton } from './ToolbarButton/LabelButton';
import { NormalButton } from './ToolbarButton/NormalButton';

export const ToolbarItem = (props: {
  name: string;
  type: string;
  buttonRef?: React.MutableRefObject<HTMLButtonElement | null>;
  onClick?: (type: string, value?: string) => void;
  children?: React.ReactNode;
  Icon?: IconType;
}) => {
  const { name, type, buttonRef, onClick, Icon, children } = props;
  return type === 'LabelButton' ? (
    <LabelButton name={name} children={children} onClick={onClick} />
  ) : (
    <NormalButton
      Icon={Icon || BsAlarm}
      name={name}
      children={children}
      buttonRef={buttonRef}
      onClick={onClick}
    />
  );
};
