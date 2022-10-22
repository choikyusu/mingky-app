import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import stores, { RootState } from '../store/configureStore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { menuActions } from '../store/modules/actions/menu.action';
import { getToday, getYYYYMMDD } from '../utils/date.util';
import { eventActions } from '../store/modules/actions/event.action';
import { useSelector } from 'react-redux';
import { editActions } from '../store/modules/actions/edit.action';

export function Editor() {
  const editId: string = useSelector((state: RootState) => state.edit.editId);

  useEffect(() => {
    if (editId !== '') {
      const event: EventItem = stores.getState().event.eventList[editId];

      setInitTitle(event.name);
      setInitMain(event.description);
      setTitle(event.name);
      setMain(event.description);
    }
  }, [editId]);

  const [initTitle, setInitTitle] = useState<string>('');
  const [initMain, setInitMain] = useState<string>('');

  const imgSelector: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const [title, setTitle] = useState<string>('');
  const [main, setMain] = useState<string>('');
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date(getToday()));
  const [endDate, setEndDate] = useState<Date>(new Date(getToday()));
  const [category, setCategory] = useState<Category | ''>('');

  useEffect(() => {
    console.log(main);
  }, [main]);

  return (
    <Wrapper>
      <div id="editor-menu">
        <button
          type="button"
          onClick={e => {
            document.execCommand('bold');
          }}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={e => {
            document.execCommand('italic');
          }}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={e => {
            document.execCommand('underline');
          }}
        >
          Underline
        </button>
        <button
          type="button"
          onClick={e => {
            document.execCommand('strikeThrough');
          }}
        >
          Strike
        </button>
        <button
          type="button"
          onClick={e => {
            document.execCommand('insertOrderedList');
          }}
        >
          OL
        </button>
        <button
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
              const reader = new FileReader();
              reader.addEventListener('load', function (e) {
                document.execCommand('insertImage', false, `${reader.result}`);
              });
              reader.readAsDataURL(files[0]);
            }
          }}
        />
        <select
          id="select-font-size"
          onChange={e => {
            document.execCommand('fontSize', false, e.target.value);
          }}
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
                  name: title,
                  description: main,
                  category: category !== '' ? category : 'SAVE',
                  status: '',
                  done: false,
                  bold: false,
                  hidden: false,
                },
              }),
            );
            stores.dispatch(editActions.setEditId({ editId: '' }));
            stores.dispatch(menuActions.setMenu({ menu: 'HOME_MENU' }));
            stores.dispatch(menuActions.setMode({ mode: 'NORMAL' }));
          }}
        >
          개시
        </button>
        <button
          type="button"
          onClick={() => {
            stores.dispatch(editActions.setEditId({ editId: '' }));
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
        >
          <option value="">카테고리</option>
          <option value="SAVE">절약</option>
          <option value="INCOME">부수입</option>
          <option value="RAFFLE">추첨</option>
          <option value="TIP">꿀팁</option>
        </select>
      </div>
      <div
        id="editor-title"
        contentEditable="true"
        suppressContentEditableWarning
        onInput={e => {
          const target = e.target as HTMLDivElement;
          setTitle(target.innerHTML);
        }}
        dangerouslySetInnerHTML={{
          __html: initTitle,
        }}
      />
      <div
        id="editor-main"
        contentEditable="true"
        suppressContentEditableWarning
        onInput={e => {
          const target = e.target as HTMLDivElement;
          setMain(target.innerHTML);
        }}
        onClick={e => {
          const target = e.target as HTMLDivElement;
          target.focus();
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
          else setEndDate(value);
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
  }
  #img-selector {
    display: none;
  }
`;
