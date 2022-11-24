import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import stores, { RootState } from '../store/configureStore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { menuActions } from '../store/modules/actions/menu.action';
import { getToday, getYYYYMMDD } from '../utils/date.util';
import { eventActions } from '../store/modules/actions/event.action';
import { useSelector } from 'react-redux';
import { editActions } from '../store/modules/actions/edit.action';
import { API } from '../constants/api.constant';
import useFetch from '../hooks/useFetch';
import axios from 'axios';

export function Editor() {
  const {
    editId,
    title,
    contents,
  }: { editId: string; title: string; contents: string } = useSelector(
    (state: RootState) => state.edit,
  );

  const newFetch = useFetch();

  useEffect(() => {
    (async () => {
      if (contents !== '') {
        setInitMain(contents);
        setMain(contents);
      }
      if (title !== '') {
        setInitTitle(title);
        setEditorTitle(title);
      }
    })();
  }, [title, contents]);

  useEffect(() => {
    (async () => {
      if (editId === '') return;
      const resultData = await newFetch.callApi({
        url: `${API.GET_EVENT_BY_ID}/${editId}`,
        method: 'get',
      });
      if (resultData) {
        const { event } = resultData;
        setInitTitle(event.name);
        setEditorTitleText(event.nameText);
        setInitMain(event.description);
        setEditorTitle(event.name);
        setMain(event.description);
        setStartDate(new Date(event.startDate));
        setEndDate(new Date(event.endDate));
        setCategory(event.category);
        setStatus(event.status);
      }
    })();
  }, [editId]);

  const [initTitle, setInitTitle] = useState<string>('');
  const [initMain, setInitMain] = useState<string>('');

  const imgSelector: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);
  const mainEditor: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const titleEditor: React.MutableRefObject<HTMLDivElement | null> =
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

  const [editorTitle, setEditorTitle] = useState<string>('');
  const [editorTitleText, setEditorTitleText] = useState<string>('');
  const [main, setMain] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date(getToday()));
  const [endDate, setEndDate] = useState<Date>(new Date(getToday()));
  const [category, setCategory] = useState<Category | ''>('');
  const [fontName, setFontName] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(0);
  const [fontColor, setFontColor] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const fontSizeList = [10, 13, 16, 18, 24, 32, 48];

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
      const fontSize = getComputedStyleProperty(
        containerEl as HTMLElement,
        'fontSize',
      );
      const fontName = getComputedStyleProperty(
        containerEl as HTMLElement,
        'fontFamily',
      );

      const fontColor = getComputedStyleProperty(
        containerEl as HTMLElement,
        'color',
      );
      const backgroundColor = getComputedStyleProperty(
        containerEl as HTMLElement,
        'backgroundColor',
      );
      const size = parseInt(fontSize.replace('px', ''), 10);

      setFontName(fontName);
      setFontSize(fontSizeList.findIndex(value => value === size) + 1);
      setFontColor(rgbToHex(fontColor).toUpperCase());

      if (backgroundColor === 'rgba(0, 0, 0, 0)') {
        setBgColor(backgroundColor);
      } else {
        setBgColor(rgbToHex(backgroundColor).toUpperCase());
      }
      // fontSizeSelector.value = fontSizeList.indexOf(size) + 1;
      // // fontName이 문자열 "폰트명"으로 오기 때문에 "를 제거해주는 코드 추가
      // fontNameSelector.value = fontName.replaceAll('"', '');
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

  return (
    <Wrapper>
      <div id="editor-menu">
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
          <option value="">폰트 사이즈</option>
          <option value="1">10px</option>
          <option value="2">13px</option>
          <option value="3">16px</option>
          <option value="4">18px</option>
          <option value="5">24px</option>
          <option value="6">32px</option>
          <option value="7">48px</option>
        </select>
        <select
          id="select-font-color"
          onChange={e => {
            document.execCommand('foreColor', false, e.target.value);
          }}
          value={fontColor}
        >
          <option value="">폰트 색상</option>
          <option value="#000000">검정</option>
          <option value="#FFFFFF">흰색</option>
          <option value="#CCCCCC">회색</option>
          <option value="#F03E3E">빨강</option>
          <option value="#1971C2">파랑</option>
          <option value="#37B24D">녹색</option>
        </select>
        <select
          id="select-font-background"
          onChange={e => {
            document.execCommand('hiliteColor', false, e.target.value);
          }}
          value={bgColor}
        >
          <option value="rgba(0, 0, 0, 0)">폰트 백그라운드</option>
          <option value="#000000">검정</option>
          <option value="#FFFFFF">흰색</option>
          <option value="#CCCCCC">회색</option>
          <option value="#F03E3E">빨강</option>
          <option value="#1971C2">파랑</option>
          <option value="#37B24D">녹색</option>
        </select>
        <button
          type="button"
          onClick={e => {
            stores.dispatch(
              eventActions.addEventItem({
                event: {
                  id: editId !== '' ? editId : '6',
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                  name: editorTitle,
                  nameText: titleEditor.current?.innerText || '',
                  summary: mainEditor.current?.innerText.slice(0, 50) || '',
                  description: main,
                  category: category !== '' ? category : 'SAVE',
                  status,
                  done: false,
                  bold: false,
                  hidden: false,
                  check: false,
                },
              }),
            );
            stores.dispatch(editActions.setEditId({ editId: '' }));
            stores.dispatch(
              editActions.setContents({ title: '', contents: '' }),
            );
            stores.dispatch(menuActions.setMenu({ menu: 'HOME_MENU' }));
            stores.dispatch(menuActions.setMode({ mode: 'NORMAL' }));

            if (editId === '') {
              newFetch.callApi({
                url: API.CREATE_EVENT,
                method: 'post',
                data: {
                  startDate: getYYYYMMDD(startDate),
                  endDate: getYYYYMMDD(endDate),
                  name: editorTitle,
                  nameText: titleEditor.current?.innerText || '',
                  summary: mainEditor.current?.innerText.slice(0, 50) || '',
                  description: main,
                  category,
                  status,
                  done: false,
                  bold: false,
                  hidden: false,
                  check: false,
                },
              });
            } else {
              newFetch.callApi({
                url: `${API.UPDATE_EVENT}/${editId}`,
                method: 'put',
                data: {
                  id: editId,
                  startDate: getYYYYMMDD(startDate),
                  endDate: getYYYYMMDD(endDate),
                  name: editorTitle,
                  nameText: titleEditor.current?.innerText || '',
                  summary: mainEditor.current?.innerText.slice(0, 50) || '',
                  description: main,
                  category,
                  status,
                  done: false,
                  bold: false,
                  hidden: false,
                  check: false,
                },
              });
            }
          }}
        >
          개시
        </button>
        <button
          type="button"
          onClick={() => {
            stores.dispatch(editActions.setEditId({ editId: '' }));
            stores.dispatch(
              editActions.setContents({ title: '', contents: '' }),
            );
            stores.dispatch(menuActions.setMenu({ menu: 'HOME_MENU' }));
            stores.dispatch(menuActions.setMode({ mode: 'NORMAL' }));
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
      </div>
      <div
        ref={titleEditor}
        id="editor-title"
        contentEditable="true"
        suppressContentEditableWarning
        onInput={e => {
          const target = e.target as HTMLDivElement;
          setEditorTitle(target.innerHTML);
        }}
        dangerouslySetInnerHTML={{
          __html: initTitle,
        }}
      />
      <div
        ref={mainEditor}
        id="editor-main"
        contentEditable="true"
        suppressContentEditableWarning
        onMouseDown={e => {
          checkStyle();
        }}
        onInput={e => {
          const target = e.target as HTMLDivElement;
          setMain(target.innerHTML);
        }}
        role="button"
        tabIndex={0}
        dangerouslySetInnerHTML={{
          __html: initMain,
        }}
      />
      <Calendar
        onChange={(value: Date) => {
          if (selectedDate === 'start') setStartDate(value);
          else if (selectedDate === 'end') setEndDate(value);
        }}
        value={value}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  #editor-menu {
    display: flex;
  }
  #editor-title {
    padding: 16px 24px;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
  }
  #editor-main {
    padding: 16px 24px;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    min-height: 500px;

    .se-image {
      text-align: center;
      .se-image-resource {
        width: 70%;
      }
    }

    .se-text-paragraph {
      white-space: break-spaces;
    }

    .se-text-paragraph-align-center {
      text-align: center !important;
    }

    .se-component-content {
      .se-section-align-center {
        margin-right: auto;
        margin-left: auto;
      }
    }

    .se-sticker {
      text-align: center;
    }

    .se-oembed {
      text-align: center;
    }

    .se-section-oglink {
      width: 100%;
      max-width: 450px;

      .se-oglink-thumbnail {
        overflow: hidden;
        max-height: 450px;
        border: 1px solid rgba(0, 0, 0, 0.1);

        .se-oglink-thumbnail-resource {
          max-height: 450px;
          width: 100%;
          height: auto;
          vertical-align: top;
        }
      }
      .se-module-oglink {
        display: block;
        position: relative;
        width: 100%;
        background-color: #fff;
        text-decoration: none;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 8%);
        cursor: pointer;

        &::before {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border: 1px solid rgba(0, 0, 0, 0.1);
          content: '';
        }

        .se-oglink-info {
          padding: 21px 26px 18px;
          position: relative;
          display: block;
          line-height: 1.4;
          text-align: left;
          box-sizing: border-box;
          font-size: 0;
          outline: 1px solid rgba(0, 0, 0, 0.1);

          .se-oglink-info-container {
            display: inline-block;
            max-width: 100%;
            vertical-align: middle;

            .se-oglink-title {
              white-space: nowrap;
              word-wrap: normal;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-all;
              display: block;
              line-height: 15px;
              font-weight: 700;
              font-size: 13px;
              color: #333;
              font-size: 15px;
            }
            .se-oglink-summary {
              margin-top: 7px;
              font-size: 13px;
              max-height: 34px;
              white-space: nowrap;
              word-wrap: normal;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-all;
              line-height: 18px;
              color: #999;
            }
            .se-oglink-url {
              white-space: nowrap;
              word-wrap: normal;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-all;
              margin-top: 5px;
              line-height: 15px;
              font-size: 13px;
              color: #00a832;
              text-decoration: none;
              margin-top: 9px;
            }
          }
        }
      }
    }
  }
  #img-selector {
  }
  button.active {
    background-color: purple;
    color: #fff;
  }
`;
