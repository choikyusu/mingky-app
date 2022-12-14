import { LabelButton } from './ToolbarButton/LabelButton';
import { NormalButton } from './ToolbarButton/NormalButton';

export const ToolbarItem = (props: {
  name: string;
  type: string;
  buttonRef?: React.MutableRefObject<HTMLButtonElement | null>;
  onClick?: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value?: string | number,
  ) => void;
  children?: React.ReactNode;
}) => {
  const {
    name,
    type,
    buttonRef,
    onClick,

    children,
  } = props;
  return type === 'LabelButton' ? (
    <LabelButton name={name} children={children} onClick={onClick} />
  ) : (
    <NormalButton
      name={name}
      children={children}
      buttonRef={buttonRef}
      onClick={onClick}
    />
  );
};
