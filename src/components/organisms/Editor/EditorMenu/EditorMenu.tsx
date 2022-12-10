import axios from 'axios';
import { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { getYYYYMMDD } from '../../../../utils/date.util';
import { CATEGORY_LIST } from '../../../../constants/category.constant';
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsTypeStrikethrough,
  BsListUl,
  BsListOl,
} from 'react-icons/bs';
import { BiFontColor, BiColorFill, BiAlignLeft } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';

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
            <li className="section-toolbar-item">
              <div className="section-toolbar-label-select-container">
                <button
                  className="section-font-size-toolbar-button"
                  type="button"
                >
                  <span className="section-toolbar-label">카테고리</span>
                </button>
              </div>
            </li>
            <li className="section-toolbar-item">
              <div className="section-toolbar-label-select-container">
                <button
                  className="section-font-size-toolbar-button"
                  type="button"
                >
                  <span className="section-toolbar-label">상태</span>
                </button>
              </div>
            </li>
            <li className="section-toolbar-item-separator-bar">
              <div className="separator-bar" />
            </li>
            <li className="section-toolbar-item">
              <div className="section-toolbar-label-select-container">
                <button
                  className="section-font-size-toolbar-button"
                  type="button"
                >
                  <span className="section-toolbar-label">15</span>
                </button>
              </div>
            </li>
            <li className="section-toolbar-item-separator-bar">
              <div className="separator-bar" />
            </li>
            <li
              className="section-toolbar-item"
              onClick={e => {
                document.execCommand('bold');
              }}
            >
              <button
                className="section-toolbar-item-button"
                type="button"
                ref={boldRef}
              >
                <BsTypeBold className="section-toolbar-icon" />
              </button>
            </li>
            <li
              className="section-toolbar-item"
              onClick={e => {
                document.execCommand('italic');
              }}
            >
              <button
                className="section-toolbar-item-button"
                type="button"
                ref={italicRef}
              >
                <BsTypeItalic className="section-toolbar-icon" />
              </button>
            </li>
            <li
              className="section-toolbar-item"
              onClick={e => {
                document.execCommand('underline');
              }}
            >
              <button
                ref={underlineRef}
                className="section-toolbar-item-button"
                type="button"
              >
                <BsTypeUnderline className="section-toolbar-icon" />
              </button>
            </li>
            <li
              className="section-toolbar-item"
              onClick={e => {
                document.execCommand('strikeThrough');
              }}
            >
              <button
                ref={strikeRef}
                className="section-toolbar-item-button"
                type="button"
              >
                <BsTypeStrikethrough className="section-toolbar-icon" />
              </button>
            </li>
            <li className="section-toolbar-item">
              <button className="section-toolbar-item-button" type="button">
                <BiFontColor className="section-toolbar-icon" />
              </button>
            </li>
            <li className="section-toolbar-item">
              <button className="section-toolbar-item-button" type="button">
                <BiColorFill className="section-toolbar-icon" />
              </button>
            </li>
            <li className="section-toolbar-item-separator-bar">
              <div className="separator-bar" />
            </li>
            <li className="section-toolbar-item">
              <button className="section-toolbar-item-button" type="button">
                <BiAlignLeft className="section-toolbar-icon" />
              </button>
            </li>
            <li
              className="section-toolbar-item"
              onClick={e => {
                document.execCommand('insertOrderedList');
              }}
            >
              <button
                className="section-toolbar-item-button"
                type="button"
                ref={orderListRef}
              >
                <BsListOl className="section-toolbar-icon" />
              </button>
            </li>
            <li
              className="section-toolbar-item"
              onClick={e => {
                document.execCommand('insertUnorderedList');
              }}
            >
              <button
                className="section-toolbar-item-button"
                type="button"
                ref={unorderListRef}
              >
                <BsListUl className="section-toolbar-icon" />
              </button>
            </li>
            <li className="section-toolbar-item-separator-bar">
              <div className="separator-bar" />
            </li>
            <li className="section-toolbar-item">
              <button className="section-toolbar-item-button" type="button">
                <AiOutlinePicture className="section-toolbar-icon" />
              </button>
            </li>
            <li className="section-toolbar-item-separator-bar">
              <div className="separator-bar" />
            </li>
            <li className="section-toolbar-item">
              <div className="section-toolbar-label-select-container">
                <button
                  className="section-font-size-toolbar-button"
                  type="button"
                >
                  <span className="section-toolbar-label">2022-12-01</span>
                </button>
              </div>
            </li>
            <li className="section-toolbar-item">
              <div className="section-toolbar-label-select-container">
                <span className="section-toolbar-label">~</span>
              </div>
            </li>
            <li className="section-toolbar-item">
              <div className="section-toolbar-label-select-container">
                <button
                  className="section-font-size-toolbar-button"
                  type="button"
                >
                  <span className="section-toolbar-label">2022-12-02</span>
                </button>
              </div>
            </li>
          </ul>
        </div>

        <button type="button">OL</button>
        <button type="button">UL</button>
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
          {CATEGORY_LIST.map(category => (
            <option value={category.id}>{category.name}</option>
          ))}
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

    .section-toolbar-item {
      display: flex;
      align-items: center;
      position: relative;
      flex: 0 0 auto;
      height: 100%;
      padding-right: 7px;
      height: 33px;

      .section-toolbar-label-select-container {
        position: relative;

        .section-font-size-toolbar-button {
          min-width: 55px;
          position: relative;
          height: 33px;
          padding-right: 32px;
          padding-left: 10px;
          text-align: left;

          &:after {
            width: 1px;
            height: 1px;
            box-shadow: 0 2px 0 0 #999, -4px -2px 0 0 #999, 4px -2px 0 0 #999,
              -3px -1px 0 0 #999, 3px -1px 0 0 #999, -2px 0 0 0 #999,
              2px 0 0 0 #999, -1px 1px 0 0 #999, 1px 1px 0 0 #999,
              0 2px 0 0 #999, 0 2px 0 0 #999;
            content: '';
            position: absolute;
            top: 16px;
            right: 14px;
            margin: auto;
          }

          .section-toolbar-label {
            font-size: 12px;
          }
        }
      }

      .section-toolbar-item-button {
        &.active {
          color: #3cc83c;
        }
        padding: 0;
        background-color: transparent;
        border: 0;
        cursor: pointer;
        font: inherit;
        border-radius: 0;
        outline: 0;
        box-sizing: border-box;
        .section-toolbar-icon {
          color: inherit;
          width: 21px;
          height: 21px;
          display: inline-block;
          &:hover {
            color: #3cc83c;
          }
        }
      }
    }
  }

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
