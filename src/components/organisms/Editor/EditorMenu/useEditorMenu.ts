import { useImperativeHandle, useRef, useState } from 'react';
import { FONT_SIZE_LIST } from '../../../../constants/editor.constant';

export function useEditor(params: {
  editorMenuRef: React.MutableRefObject<any>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  setCategory: React.Dispatch<React.SetStateAction<'' | Category>>;
}) {
  const { editorMenuRef, setCategory, setStatus, setSelectedDate, setEndDate } =
    params;

  useImperativeHandle(editorMenuRef, () => ({
    checkStyle,
  }));

  const [fontSize, setFontSize] = useState<number>(3);
  const [fontColor, setFontColor] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('');
  const [value, onChange] = useState(new Date());

  const imgSelector: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);
  const boldRef: React.MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const italicRef: React.MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const underlineRef: React.MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const strikeRef: React.MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const orderListRef: React.MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const unorderListRef: React.MutableRefObject<HTMLButtonElement | null> =
    useRef(null);

  function checkStyle() {
    reportFont();
    if (isStyle('bold')) {
      boldRef?.current?.classList.add('active');
    } else {
      boldRef?.current?.classList.remove('active');
    }
    if (isStyle('italic')) {
      italicRef?.current?.classList.add('active');
    } else {
      italicRef?.current?.classList.remove('active');
    }
    if (isStyle('underline')) {
      underlineRef?.current?.classList.add('active');
    } else {
      underlineRef?.current?.classList.remove('active');
    }
    if (isStyle('strikeThrough')) {
      strikeRef?.current?.classList.add('active');
    } else {
      strikeRef?.current?.classList.remove('active');
    }
    if (isStyle('insertOrderedList')) {
      orderListRef?.current?.classList.add('active');
    } else {
      orderListRef?.current?.classList.remove('active');
    }
    if (isStyle('insertUnorderedList')) {
      unorderListRef?.current?.classList.add('active');
    } else {
      unorderListRef?.current?.classList.remove('active');
    }
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
    let containerEl: Node | null = null;
    let sel: Selection | null = null;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel?.rangeCount) {
        containerEl = sel.getRangeAt(0).commonAncestorContainer;
        if (containerEl.nodeType === 3) {
          containerEl = containerEl.parentNode;
        }
      }
    }
    // if (sel === document.getSelection() && sel?.type !== 'Control') {
    //   containerEl = sel?.focusNode?.parentElement();
    // }

    if (containerEl) {
      const usedFontSize = getComputedStyleProperty(
        containerEl as HTMLElement,
        'fontSize',
      );

      const fontColor = getComputedStyleProperty(
        containerEl as HTMLElement,
        'color',
      );
      const backgroundColor = getComputedStyleProperty(
        containerEl as HTMLElement,
        'backgroundColor',
      );

      setFontSize(
        FONT_SIZE_LIST.list.findIndex(
          fontSize => fontSize.fontSize === usedFontSize,
        ),
      );
      setFontColor(rgbToHex(fontColor).toUpperCase());

      if (backgroundColor === 'rgba(0, 0, 0, 0)') {
        setBgColor(backgroundColor);
      } else {
        setBgColor(rgbToHex(backgroundColor).toUpperCase());
      }
      // fontSizeSelector.value = fontSizeList.indexOf(size) + 1;
    }
  }

  function componentToHex(c: string) {
    const hex = parseInt(c, 10).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  function rgbToHex(color: string) {
    // rgb(r, g, b)에서 색상값만 뽑아 내기 위해서 rgb() 제거
    const temp = color.replace(/[^0-9,]/g, '');
    // r,g,b만 남은 값을 ,로 [r,g,b] 배열로 변환
    const rgb = temp.split(',');
    return `#${componentToHex(rgb[0])}${componentToHex(rgb[1])}${componentToHex(
      rgb[2],
    )}`;
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
        if (imgSelector) imgSelector.current?.click();
        break;
      case 'BOLD':
      case 'ITALIC':
      case 'UNDERLINE':
      case 'STRIKETHROUGH':
      case 'INSERTORDEREDLIST':
      case 'INSERTUNORDEREDLIST':
        document.execCommand(type);
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
        break;
    }
  }

  return {
    fontSize,
    boldRef,
    italicRef,
    underlineRef,
    strikeRef,
    fontColor,
    bgColor,
    orderListRef,
    imgSelector,
    unorderListRef,
    value,
    clickMenuItem,
  };
}
