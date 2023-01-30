import { IconType } from 'react-icons';
import { AiOutlinePicture } from 'react-icons/ai';
import { BiColorFill, BiFontColor } from 'react-icons/bi';
import {
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from 'react-icons/bs';
import { AlignmentOption } from '../components/organisms/Editor/EditorMenu/Toolbar/ToolbarItem/ToolbarButton/ButtonOption/AlignmentOption';
import { ColorPickerOption } from '../components/organisms/Editor/EditorMenu/Toolbar/ToolbarItem/ToolbarButton/ButtonOption/ColorPickerOption';
import { ListOption } from '../components/organisms/Editor/EditorMenu/Toolbar/ToolbarItem/ToolbarButton/ButtonOption/ListOption';
import { useEditorState } from '../components/organisms/Editor/EditorProvider';
import { categoryList, statusList } from '../constants/category.constant';
import { FONT_SIZE_LIST } from '../constants/editor.constant';

function useToolbar(params: {
  fontSize: number;
  fontColor: string;
  bgColor: string;
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
    menuRef,
    getAlignIcon,
    clickMenuItem,
    getCategoryName,
    getStatusName,
    getFontSizePx,
  } = params;
  const menuList = [
    {
      name: getCategoryName(),
      type: 'LabelButton',
      children: (
        <ListOption
          optionList={categoryList}
          onClick={clickMenuItem}
          selectedValue={editorProvider.category}
        />
      ),
    },
    {
      name: getStatusName(),
      type: 'LabelButton',
      children: (
        <ListOption
          optionList={statusList}
          onClick={clickMenuItem}
          selectedValue={editorProvider.status}
        />
      ),
      showSeparator: true,
    },
    {
      name: getFontSizePx(),
      type: 'LabelButton',
      children: (
        <ListOption
          optionList={FONT_SIZE_LIST}
          selectedValue={fontSize}
          onClick={clickMenuItem}
        />
      ),
      showSeparator: true,
    },
    {
      name: 'BOLD',
      icon: BsTypeBold,
      type: 'NormalButton',
      buttonRef: menuRef.bold as React.RefObject<HTMLButtonElement>,
      onClick: clickMenuItem,
    },
    {
      name: 'ITALIC',
      icon: BsTypeItalic,
      type: 'NormalButton',
      buttonRef: menuRef.italic as React.RefObject<HTMLButtonElement>,
      onClick: clickMenuItem,
    },
    {
      name: 'UNDERLINE',
      icon: BsTypeUnderline,
      type: 'NormalButton',
      buttonRef: menuRef.underline as React.RefObject<HTMLButtonElement>,
      onClick: clickMenuItem,
    },
    {
      name: 'STRIKETHROUGH',
      icon: BsTypeStrikethrough,
      type: 'NormalButton',
      buttonRef: menuRef.strikeThrough as React.RefObject<HTMLButtonElement>,
      onClick: clickMenuItem,
    },
    {
      name: 'FONTCOLOR',
      icon: BiFontColor,
      type: 'NormalButton',
      children: (
        <ColorPickerOption
          name="FORECOLOR"
          bgColor={fontColor}
          onClick={clickMenuItem}
        />
      ),
    },
    {
      name: 'BACKGROUND_COLOR',
      icon: BiColorFill,
      type: 'NormalButton',
      children: (
        <ColorPickerOption
          name="HILITECOLOR"
          bgColor={bgColor}
          onClick={clickMenuItem}
        />
      ),
      showSeparator: true,
    },
    {
      name: 'ALIGN',
      icon: getAlignIcon(),
      type: 'NormalButton',
      children: <AlignmentOption onClick={clickMenuItem} />,
    },
    {
      name: 'INSERTORDEREDLIST',
      icon: BsListOl,
      type: 'NormalButton',
      buttonRef:
        menuRef.insertOrderedList as React.RefObject<HTMLButtonElement>,
      onClick: clickMenuItem,
    },
    {
      name: 'INSERTUNORDEREDLIST',
      icon: BsListUl,
      type: 'NormalButton',
      buttonRef:
        menuRef.insertUnorderedList as React.RefObject<HTMLButtonElement>,
      onClick: clickMenuItem,
      showSeparator: true,
    },
    {
      name: 'PICTURE',
      icon: AiOutlinePicture,
      type: 'NormalButton',
      onClick: clickMenuItem,
      showSeparator: true,
    },
  ];

  return { menuList };
}

export default useToolbar;
