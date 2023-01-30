import { IconType } from 'react-icons';
import { SeparatorBar } from './ToolbarItem/SeparatorBar/SeparatorBar';
import { ToolbarItem } from './ToolbarItem/ToolbarItem';
import { getYYYYMMDD } from '../../../../../utils/date.util';
import { CalendarOption } from './ToolbarItem/ToolbarButton/ButtonOption/CalendarOption';
import styled from 'styled-components';
import useToolbar from '../../../../../hooks/useToolbar';
import { useEditorState } from '../../EditorProvider';

export function Toolbar(props: {
  fontSize: number;
  fontColor: string;
  bgColor: string;
  value: Date;
  menuRef: {
    [key: string]:
      | React.RefObject<HTMLButtonElement>
      | React.RefObject<HTMLInputElement>;
  };
  getAlignIcon: () => IconType;
  clickMenuItem: (type: string, value?: string | undefined) => void;
  getCategoryName: () => string;
  getStatusName: () => string;
  getFontSizePx: () => string;
}) {
  const editorProvider = useEditorState();
  const {
    fontSize,
    fontColor,
    bgColor,
    value,
    menuRef,
    getAlignIcon,
    clickMenuItem,
    getCategoryName,
    getStatusName,
    getFontSizePx,
  } = props;

  const { menuList } = useToolbar({ ...props });

  return (
    <ToolbarWrapper>
      {menuList.map(menu => (
        <>
          <ToolbarItem
            name={menu.name}
            type={menu.type}
            Icon={menu.icon}
            buttonRef={menu.buttonRef}
            onClick={menu.onClick}
          >
            {menu.children}
          </ToolbarItem>
          {menu.showSeparator && <SeparatorBar />}
        </>
      ))}
      <ToolbarItem
        name={getYYYYMMDD(editorProvider.startDate)}
        type="LabelButton"
        onClick={() => {
          clickMenuItem('START');
        }}
      >
        <CalendarOption
          value={value}
          selectedDate={editorProvider.selectedDate}
          setStartDate={editorProvider.setStartDate}
          setEndDate={editorProvider.setEndDate}
        />
      </ToolbarItem>
      ~
      <ToolbarItem
        name={getYYYYMMDD(editorProvider.endDate)}
        type="LabelButton"
        onClick={() => clickMenuItem('END')}
      >
        <CalendarOption
          value={value}
          selectedDate={editorProvider.selectedDate}
          setStartDate={editorProvider.setStartDate}
          setEndDate={editorProvider.setEndDate}
        />
      </ToolbarItem>
    </ToolbarWrapper>
  );
}

const ToolbarWrapper = styled.ul`
  &:before {
    border-top: 1px solid #e5e5e5;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 20;
  }
  &:after {
    border-top: 1px solid #e5e5e5;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 20;
  }

  display: flex;
  height: 33px;
  padding-left: 7px;
  background-color: #fff;
  align-items: center;
`;
