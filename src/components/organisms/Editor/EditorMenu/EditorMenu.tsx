import axios from 'axios';
import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  SetStateAction,
} from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { getYYYYMMDD } from '../../../../utils/date.util';
import {
  categoryList,
  statusList,
} from '../../../../constants/category.constant';

import { ToolbarItem } from './ToolbarItem/ToolbarItem';
import { SeparatorBar } from './ToolbarItem/SeparatorBar/SeparatorBar';
import { ListOption } from './ToolbarItem/ToolbarButton/LabelButtonOption/ListOption';
import { CalendarOption } from './ToolbarItem/ToolbarButton/LabelButtonOption/CalendarOption';

const fontColorList: FontColor = {
  type: 'FONT_COLOR',
  list: [
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
  ],
};

const fontSizeList: FontSizeList = {
  type: 'FONT_SIZE',
  list: [
    {
      value: 1,
      fontSize: '10px',
    },
    {
      value: 2,
      fontSize: '13px',
    },
    {
      value: 3,
      fontSize: '16px',
    },
    {
      value: 4,
      fontSize: '18px',
    },
    {
      value: 5,
      fontSize: '24px',
    },
    {
      value: 6,
      fontSize: '32px',
    },
    {
      value: 7,
      fontSize: '48px',
    },
  ],
};

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
          fontSizeList.list.findIndex(
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
        <div className="header">
          <div>타이틀</div>
          <div className="header-menu">
            <div className="header-button-container">
              <button className="publish-button" type="button">
                발행
              </button>
            </div>
          </div>
        </div>
        <div className="section-layer-toolbar">
          <ul className="section-toolbar">
            <ToolbarItem
              name={category === '' ? '카테고리' : category}
              type="LabelButton"
            >
              <ListOption
                optionList={categoryList}
                onClick={(e, value) => {
                  if (typeof value === 'string') setCategory(value as Category);
                }}
                selectedValue={category}
              />
            </ToolbarItem>
            <ToolbarItem
              name={status === '' ? '상태' : status}
              type="LabelButton"
            >
              <ListOption
                optionList={statusList}
                onClick={(e, value) => {
                  if (typeof value === 'string') setStatus(value);
                }}
                selectedValue={status}
              />
            </ToolbarItem>
            <SeparatorBar />
            <ToolbarItem name={String(fontSize)} type="LabelButton">
              <ListOption
                optionList={fontSizeList}
                selectedValue={fontSize}
                onClick={(e, value) => {
                  if (typeof value === 'number') {
                    setFontSize(value);
                    document.execCommand('fontSize', false, String(value));
                  }
                }}
              />
            </ToolbarItem>
            <SeparatorBar />
            <ToolbarItem
              name="BOLD"
              type="NormalButton"
              buttonRef={boldRef}
              onClick={() => {
                document.execCommand('bold');
              }}
            />
            <ToolbarItem
              name="ITALIC"
              type="NormalButton"
              buttonRef={italicRef}
              onClick={() => {
                document.execCommand('italic');
              }}
            />
            <ToolbarItem
              name="UNDERLINE"
              type="NormalButton"
              buttonRef={underlineRef}
              onClick={() => {
                document.execCommand('underline');
              }}
            />
            <ToolbarItem
              name="STRIKE"
              type="NormalButton"
              buttonRef={strikeRef}
              onClick={() => {
                document.execCommand('strikeThrough');
              }}
            />
            <ToolbarItem
              name="FONTCOLOR"
              type="NormalButton"
              onClick={() => {
                document.execCommand('strikeThrough');
              }}
            />
            <ToolbarItem
              name="BACKGROUND_COLOR"
              type="NormalButton"
              onClick={() => {
                document.execCommand('strikeThrough');
              }}
            />
            <SeparatorBar />
            <ToolbarItem
              name="ALIGN_LEFT"
              type="NormalButton"
              buttonRef={italicRef}
              onClick={() => {
                document.execCommand('strikeThrough');
              }}
            />
            <ToolbarItem
              name="OL"
              type="NormalButton"
              buttonRef={orderListRef}
              onClick={() => {
                document.execCommand('insertOrderedList');
              }}
            />
            <ToolbarItem
              name="UL"
              type="NormalButton"
              buttonRef={unorderListRef}
              onClick={() => {
                document.execCommand('insertUnorderedList');
              }}
            />
            <SeparatorBar />
            <ToolbarItem
              name="PICTURE"
              type="NormalButton"
              onClick={() => {
                if (imgSelector) imgSelector.current?.click();
              }}
            />
            <SeparatorBar />
            <ToolbarItem
              name={getYYYYMMDD(startDate)}
              type="LabelButton"
              onClick={() => {
                setSelectedDate('start');
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
              onClick={() => setSelectedDate('end')}
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
          id="select-font-color"
          onChange={e => {
            document.execCommand('foreColor', false, e.target.value);
          }}
          value={fontColor}
        >
          <option value="">폰트 색상</option>
          {fontColorList.list.map(color => (
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
          {fontColorList.list.map(color => (
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
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  .header {
    height: 44px;
    position: relative;
    display: flex;
    flex: 1;
    .header-menu {
      right: 0;
      position: absolute;
      .publish-button {
        background-color: #00c73c;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
        color: #fff;
        height: 30px;
        line-height: 28px;
        margin-left: 6px;
        padding-left: 13px;
        padding-right: 15px;
      }
    }
  }
  ul {
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
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    font: inherit;
    border-radius: 0;
    outline: 0;
    box-sizing: border-box;
  }

  .section-toolbar {
    display: flex;
    height: 33px;
    padding-left: 7px;
    background-color: #fff;
    align-items: center;

    .section-toolbar-item-separator-bar {
      padding-left: 7px;
      padding-right: 14px;

      .separator-bar {
        &:before {
          content: '';
          display: inline-block;
          width: 1px;
          height: 15px;
          background-color: #e5e5e5;
        }
      }
    }
  }

  #editor-menu {
    display: flex;
  }

  #img-selector {
    display: none;
  }
  button.active {
    background-color: purple;
    color: #fff;
  }
`;
