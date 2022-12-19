import { IconType } from 'react-icons';
import { SeparatorBar } from './ToolbarItem/SeparatorBar/SeparatorBar';
import { ToolbarItem } from './ToolbarItem/ToolbarItem';
import {
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from 'react-icons/bs';
import { BiColorFill, BiFontColor } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
import { FONT_SIZE_LIST } from '../../../../../constants/editor.constant';
import {
  categoryList,
  statusList,
} from '../../../../../constants/category.constant';
import { ColorPickerOption } from './ToolbarItem/ToolbarButton/ButtonOption/ColorPickerOption';
import { AlignmentOption } from './ToolbarItem/ToolbarButton/ButtonOption/AlignmentOption';
import { getYYYYMMDD } from '../../../../../utils/date.util';
import { CalendarOption } from './ToolbarItem/ToolbarButton/ButtonOption/CalendarOption';
import { ListOption } from './ToolbarItem/ToolbarButton/ButtonOption/ListOption';

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
  selectedDate: string;
  startDate: Date;
  endDate: Date;
  category: Category | '카테고리';
  status: string;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const {
    fontSize,
    fontColor,
    bgColor,
    value,
    menuRef,
    getAlignIcon,
    clickMenuItem,
    category,
    status,
    startDate,
    selectedDate,
    setEndDate,
    setStartDate,
    endDate,
  } = props;
  return (
    <div className="section-layer-toolbar">
      <ul className="section-toolbar">
        <ToolbarItem name={category} type="LabelButton">
          <ListOption
            optionList={categoryList}
            onClick={clickMenuItem}
            selectedValue={category}
          />
        </ToolbarItem>
        <ToolbarItem name={status} type="LabelButton">
          <ListOption
            optionList={statusList}
            onClick={clickMenuItem}
            selectedValue={status}
          />
        </ToolbarItem>
        <SeparatorBar />
        <ToolbarItem name={String(fontSize)} type="LabelButton">
          <ListOption
            optionList={FONT_SIZE_LIST}
            selectedValue={fontSize}
            onClick={clickMenuItem}
          />
        </ToolbarItem>
        <SeparatorBar />
        <ToolbarItem
          name="BOLD"
          Icon={BsTypeBold}
          type="NormalButton"
          buttonRef={menuRef.bold as React.RefObject<HTMLButtonElement>}
          onClick={clickMenuItem}
        />
        <ToolbarItem
          name="ITALIC"
          Icon={BsTypeItalic}
          type="NormalButton"
          buttonRef={menuRef.italic as React.RefObject<HTMLButtonElement>}
          onClick={clickMenuItem}
        />
        <ToolbarItem
          name="UNDERLINE"
          Icon={BsTypeUnderline}
          type="NormalButton"
          buttonRef={menuRef.underline as React.RefObject<HTMLButtonElement>}
          onClick={clickMenuItem}
        />
        <ToolbarItem
          name="STRIKETHROUGH"
          Icon={BsTypeStrikethrough}
          type="NormalButton"
          buttonRef={
            menuRef.strikeThrough as React.RefObject<HTMLButtonElement>
          }
          onClick={clickMenuItem}
        />
        <ToolbarItem name="FONTCOLOR" type="NormalButton" Icon={BiFontColor}>
          <ColorPickerOption
            name="FORECOLOR"
            bgColor={fontColor}
            onClick={clickMenuItem}
          />
        </ToolbarItem>
        <ToolbarItem
          name="BACKGROUND_COLOR"
          type="NormalButton"
          Icon={BiColorFill}
        >
          <ColorPickerOption
            name="HILITECOLOR"
            bgColor={bgColor}
            onClick={clickMenuItem}
          />
        </ToolbarItem>
        <SeparatorBar />
        <ToolbarItem name="ALIGN" Icon={getAlignIcon()} type="NormalButton">
          <AlignmentOption onClick={clickMenuItem} />
        </ToolbarItem>
        <ToolbarItem
          name="INSERTORDEREDLIST"
          Icon={BsListOl}
          type="NormalButton"
          buttonRef={
            menuRef.insertOrderedList as React.RefObject<HTMLButtonElement>
          }
          onClick={clickMenuItem}
        />
        <ToolbarItem
          name="INSERTUNORDEREDLIST"
          Icon={BsListUl}
          type="NormalButton"
          buttonRef={
            menuRef.insertUnorderedList as React.RefObject<HTMLButtonElement>
          }
          onClick={clickMenuItem}
        />
        <SeparatorBar />
        <ToolbarItem
          name="PICTURE"
          Icon={AiOutlinePicture}
          type="NormalButton"
          onClick={clickMenuItem}
        />
        <SeparatorBar />
        <ToolbarItem
          name={getYYYYMMDD(startDate)}
          type="LabelButton"
          onClick={() => {
            clickMenuItem('START');
          }}
        >
          <CalendarOption
            value={value}
            selectedDate={selectedDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </ToolbarItem>
        ~
        <ToolbarItem
          name={getYYYYMMDD(endDate)}
          type="LabelButton"
          onClick={() => clickMenuItem('END')}
        >
          <CalendarOption
            value={value}
            selectedDate={selectedDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </ToolbarItem>
      </ul>
    </div>
  );
}
