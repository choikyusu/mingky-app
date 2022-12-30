import { useImperativeHandle, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { FONT_SIZE_LIST } from '../../../../constants/editor.constant';
import {
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiAlignJustify,
} from 'react-icons/bi';
import { getContainerEl } from '../../../../utils/element.util';
import {
  categoryList,
  statusList,
} from '../../../../constants/category.constant';

export function useEditorMenu(params: {
  category: Category | '카테고리';
  status: string;
  editorMenuRef: React.MutableRefObject<any>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  setCategory: React.Dispatch<React.SetStateAction<'카테고리' | Category>>;
}) {
  const {
    editorMenuRef,
    setCategory,
    setStatus,
    setSelectedDate,
    category,
    status,
  } = params;

  useImperativeHandle(editorMenuRef, () => ({
    checkStyle,
  }));

  const [fontSize, setFontSize] = useState<number>(3);
  const [fontColor, setFontColor] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('');
  const [align, setAlign] = useState<string>('');
  const [value, onChange] = useState(new Date());

  const menuRef: {
    [key: string]:
      | React.RefObject<HTMLInputElement>
      | React.RefObject<HTMLButtonElement>;
  } = {
    imgSelector: useRef<HTMLInputElement>(null),
    bold: useRef<HTMLButtonElement>(null),
    italic: useRef<HTMLButtonElement>(null),
    underline: useRef<HTMLButtonElement>(null),
    strikeThrough: useRef<HTMLButtonElement>(null),
    insertOrderedList: useRef<HTMLButtonElement>(null),
    insertUnorderedList: useRef<HTMLButtonElement>(null),
  };

  function getAlignIcon() {
    if (align === 'justifyleft') return BiAlignLeft;
    if (align === 'justifyright') return BiAlignRight;
    if (align === 'justifycenter') return BiAlignMiddle;
    if (align === 'justifyfull') return BiAlignJustify;

    return BiAlignLeft;
  }

  function clickMenuItem(type: string, value?: string) {
    switch (type) {
      case 'CATEGORY':
        setCategory(value as Category);
        break;
      case 'STATUS':
        setStatus(value || '');
        break;
      case 'FONT_SIZE':
        document.execCommand('fontSize', false, value);
        break;
      case 'PICTURE':
        if (menuRef.imgSelector) menuRef.imgSelector.current?.click();
        break;
      case 'FORECOLOR':
      case 'HILITECOLOR':
        document.execCommand(type, false, value);
        break;
      case 'START':
        setSelectedDate('start');
        break;
      case 'END':
        setSelectedDate('end');
        break;
      default:
        document.execCommand(type);
        break;
    }
  }

  function getCategoryName() {
    const name = categoryList.list.find(cate => cate.id === category)?.name;
    return name || category;
  }

  function getStatusName() {
    const name = statusList.list.find(sts => sts.value === status)?.name;
    return name || status;
  }

  function getFontSizePx() {
    const fontSizePx = FONT_SIZE_LIST.list.find(
      font => font.value === String(fontSize),
    )?.fontSize;
    return fontSizePx || String(fontSize);
  }

  return {
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
  };

  /// //////////////////////////////////////////////////////

  function checkStyle() {
    reportFont();
    [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'insertOrderedList',
      'insertUnorderedList',
    ].forEach(item => {
      if (isStyle(item)) {
        menuRef[item].current?.classList.add('active');
      } else {
        menuRef[item].current?.classList.remove('active');
      }
    });

    ['justifyleft', 'justifyright', 'justifycenter', 'justifyfull'].forEach(
      item => {
        if (isStyle(item)) setAlign(item);
      },
    );
  }

  function isStyle(style: string) {
    return document.queryCommandState(style);
  }

  function getComputedStyleProperty(el: HTMLElement, propName: any) {
    if (window.getComputedStyle) {
      const style: CSSStyleDeclaration = window.getComputedStyle(el, null);
      return style[propName];
    }

    if (el.style) {
      return el.style[propName];
    }

    return '';
  }

  function reportFont() {
    const containerEl = getContainerEl();

    if (containerEl) {
      ['fontSize', 'color', 'backgroundColor'].forEach(item => {
        const usedItem = getComputedStyleProperty(
          containerEl as HTMLElement,
          item,
        );

        if (item === 'fontSize') {
          setFontSize(
            FONT_SIZE_LIST.list.findIndex(
              fontSize => fontSize.fontSize === usedItem,
            ),
          );
        } else if (item === 'color') {
          setFontColor(rgbToHex(usedItem).toUpperCase());
        } else if (item === 'backgroundColor') {
          if (usedItem === 'rgba(0, 0, 0, 0)') {
            setBgColor(usedItem);
          } else {
            setBgColor(rgbToHex(usedItem).toUpperCase());
          }
        }
      });
    }
  }

  function componentToHex(c: string) {
    const hex = parseInt(c, 10).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  function rgbToHex(color: string) {
    const temp = color.replace(/[^0-9,]/g, '');
    const rgb = temp.split(',');
    return `#${componentToHex(rgb[0])}${componentToHex(rgb[1])}${componentToHex(
      rgb[2],
    )}`;
  }
}
