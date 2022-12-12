import { LabelButton } from './ToolbarButton/LabelButton';
import { NormalButton } from './ToolbarButton/NormalButton';

export const ToolbarItem = (props: {
  name: string;
  type: string;
  buttonRef?: React.MutableRefObject<HTMLButtonElement | null>;
  onClick: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value?: string | number,
  ) => void;
  optionList?: LabelButtonOption;
  selectedValue?: string | Category | number;
}) => {
  const { name, type, buttonRef, onClick, optionList, selectedValue } = props;
  return type === 'LabelButton' ? (
    <LabelButton
      name={name}
      onClick={onClick}
      optionList={optionList}
      selectedValue={selectedValue}
    />
  ) : (
    <NormalButton name={name} buttonRef={buttonRef} onClick={onClick} />
  );
};
