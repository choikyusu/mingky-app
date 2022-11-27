import axios from 'axios';
import { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { getYYYYMMDD } from '../../../../utils/date.util';

const fontColorList = [
  {
    value: '#000000',
    fontColor: '검정',
  },
  {
    value: '#FFFFFF',
    fontColor: '흰색',
  },
  {
    value: '#CCCCCC',
    fontColor: '회색',
  },
  {
    value: '#F03E3E',
    fontColor: '빨강',
  },
  {
    value: '#1971C2',
    fontColor: '파랑',
  },
  {
    value: '#37B24D',
    fontColor: '녹색',
  },
];

const fontSizeList = [
  {
    value: '',
    fontSize: '폰트 사이즈',
  },
  {
    value: '1',
    fontSize: '10px',
  },
  {
    value: '2',
    fontSize: '13px',
  },
  {
    value: '3',
    fontSize: '16px',
  },
  {
    value: '4',
    fontSize: '18px',
  },
  {
    value: '5',
    fontSize: '24px',
  },
  {
    value: '6',
    fontSize: '32px',
  },
  {
    value: '7',
    fontSize: '48px',
  },
];

export const EditorMenu = forwardRef(
  (props: {
    selectedDate: string;
    startDate: Date;
    endDate: Date;
    category: Category | '';
    status: string;
    editorMenuRef: React.MutableRefObject<any>;
    publish: () => void;
    backHome: () => void;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
    setEndDate: React.Dispatch<React.SetStateAction<Date>>;
    setCategory: React.Dispatch<React.SetStateAction<'' | Category>>;
  }) => {
    const {
      editorMenuRef,
      publish,
      backHome,
      setSelectedDate,
      setStatus,
      setStartDate,
      setEndDate,
      setCategory,
      selectedDate,
      startDate,
      endDate,
      category,
      status,
    } = props;
    useImperativeHandle(editorMenuRef, () => ({
      checkStyle,
    }));

    const [fontSize, setFontSize] = useState<number>(0);
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
          fontSizeList.findIndex(
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
      return `#${componentToHex(rgb[0])}${componentToHex(
        rgb[1],
      )}${componentToHex(rgb[2])}`;
    }

    return (
      <Wrapper>
        <button
          ref={boldRef}
          type="button"
          onClick={e => {
            document.execCommand('bold');
          }}
        >
          Bold
        </button>
        <button
          ref={italicRef}
          type="button"
          onClick={e => {
            document.execCommand('italic');
          }}
        >
          Italic
        </button>
        <button
          ref={underlineRef}
          type="button"
          onClick={e => {
            document.execCommand('underline');
          }}
        >
          Underline
        </button>
        <button
          ref={strikeRef}
          type="button"
          onClick={e => {
            document.execCommand('strikeThrough');
          }}
        >
          Strike
        </button>
        <button
          ref={orderListRef}
          type="button"
          onClick={e => {
            document.execCommand('insertOrderedList');
          }}
        >
          OL
        </button>
        <button
          ref={unorderListRef}
          type="button"
          onClick={e => {
            document.execCommand('insertUnorderedList');
          }}
        >
          UL
        </button>
        <button
          type="button"
          onClick={e => {
            if (imgSelector) imgSelector.current?.click();
          }}
        >
          IMG
        </button>
        <input
          ref={imgSelector}
          id="img-selector"
          type="file"
          accept="image/*"
          onChange={e => {
            const { files } = e.target;
            if (files) {
              const frm = new FormData();
              frm.append('photo', files[0]);

              axios
                .post('/api/upload', frm, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then(response => {
                  document.execCommand(
                    'insertImage',
                    false,
                    `${response.data.filename}`,
                  );
                  e.target.value = '';
                  console.log(response);
                })
                .catch(error => {
                  e.target.value = '';
                });
            }
          }}
        />
        <select
          id="select-font-size"
          onChange={e => {
            document.execCommand('fontSize', false, e.target.value);
          }}
          value={fontSize}
        >
          {fontSizeList.map(fontSize => (
            <option value={fontSize.value}>{fontSize.fontSize}</option>
          ))}
        </select>
        <select
          id="select-font-color"
          onChange={e => {
            document.execCommand('foreColor', false, e.target.value);
          }}
          value={fontColor}
        >
          <option value="">폰트 색상</option>
          {fontColorList.map(color => (
            <option value={color.value}>{color.fontColor}</option>
          ))}
        </select>
        <select
          id="select-font-background"
          onChange={e => {
            document.execCommand('hiliteColor', false, e.target.value);
          }}
          value={bgColor}
        >
          <option value="rgba(0, 0, 0, 0)">폰트 백그라운드</option>
          {fontColorList.map(color => (
            <option value={color.value}>{color.fontColor}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={e => {
            publish();
          }}
        >
          개시
        </button>
        <button
          type="button"
          onClick={() => {
            backHome();
          }}
        >
          HOME
        </button>
        <div onClick={() => setSelectedDate('start')} aria-hidden>
          시작일자
        </div>
        <div onClick={() => setSelectedDate('start')} aria-hidden>
          {getYYYYMMDD(startDate)}
        </div>
        <div onClick={() => setSelectedDate('end')} aria-hidden>
          종료일자
        </div>
        <div onClick={() => setSelectedDate('end')} aria-hidden>
          {getYYYYMMDD(endDate)}
        </div>
        <select
          id="select-category"
          onChange={e => {
            setCategory(e.target.value as Category);
          }}
          value={category}
        >
          <option value="">카테고리</option>
          <option value="SAVE">절약</option>
          <option value="INCOME">부수입</option>
          <option value="RAFFLE">추첨</option>
          <option value="TIP">꿀팁</option>
          <option value="UNUSED">사용안함</option>
        </select>
        <select
          id="select-status"
          onChange={e => {
            setStatus(e.target.value);
          }}
          value={status}
        >
          <option value="">상태</option>
          <option value="COMPLETE">완료</option>
          <option value="ONGOING">진행중</option>
        </select>
        <Calendar
          onChange={(value: Date) => {
            if (selectedDate === 'start') setStartDate(value);
            else if (selectedDate === 'end') setEndDate(value);
          }}
          value={value}
        />
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  #editor-menu {
    display: flex;
  }

  #img-selector {
  }
  button.active {
    background-color: purple;
    color: #fff;
  }
`;
