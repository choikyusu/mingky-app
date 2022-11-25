import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import stores, { RootState } from '../../../store/configureStore';
import useFetch from '../../../hooks/useFetch';
import { API } from '../../../constants/api.constant';
import { getToday, getYYYYMMDD } from '../../../utils/date.util';
import { EditorMenu } from './EditorMenu/EditorMenu';
import { EditorBody } from './EditorBody/EditorBody';
import { editActions } from '../../../store/modules/actions/edit.action';
import { menuActions } from '../../../store/modules/actions/menu.action';

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

  const mainEditor: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const titleEditor: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const editorMenuRef: React.MutableRefObject<any> = useRef({});

  const [editorTitle, setEditorTitle] = useState<string>('');
  const [main, setMain] = useState<string>('');

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date(getToday()));
  const [endDate, setEndDate] = useState<Date>(new Date(getToday()));
  const [category, setCategory] = useState<Category | ''>('');

  const [status, setStatus] = useState<string>('');

  const checkStyle = () => {
    editorMenuRef.current?.checkStyle();
  };

  const backHome = () => {
    stores.dispatch(editActions.setEditId({ editId: '' }));
    stores.dispatch(editActions.setContents({ title: '', contents: '' }));
    stores.dispatch(menuActions.setMenu({ menu: 'HOME_MENU' }));
    stores.dispatch(menuActions.setMode({ mode: 'NORMAL' }));
  };

  const publish = async () => {
    if (editId === '') {
      const result = await newFetch.callApi({
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

      if (result === null) return false;

      stores.dispatch(editActions.setEditId({ editId: '' }));
      stores.dispatch(editActions.setContents({ title: '', contents: '' }));
      stores.dispatch(menuActions.setMenu({ menu: 'HOME_MENU' }));
      stores.dispatch(menuActions.setMode({ mode: 'NORMAL' }));
    } else {
      const result = await newFetch.callApi({
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

      if (result === null) return false;

      stores.dispatch(editActions.setEditId({ editId: '' }));
      stores.dispatch(editActions.setContents({ title: '', contents: '' }));
      stores.dispatch(menuActions.setMenu({ menu: 'HOME_MENU' }));
      stores.dispatch(menuActions.setMode({ mode: 'NORMAL' }));
    }
    return true;
  };

  return (
    <>
      <EditorMenu
        selectedDate={selectedDate}
        startDate={startDate}
        endDate={endDate}
        category={category}
        status={status}
        editorMenuRef={editorMenuRef}
        publish={publish}
        backHome={backHome}
        setSelectedDate={setSelectedDate}
        setCategory={setCategory}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        setStatus={setStatus}
      />
      <EditorBody
        titleEditor={titleEditor}
        mainEditor={mainEditor}
        initMain={initMain}
        initTitle={initTitle}
        setMain={setMain}
        setEditorTitle={setEditorTitle}
        checkStyle={checkStyle}
      />
    </>
  );
}
