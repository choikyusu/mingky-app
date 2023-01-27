import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../constants/api.constant';
import useFetch from '../../../hooks/useFetch';
import { RootState } from '../../../store/configureStore';
import { getToday, getYYYYMMDD } from '../../../utils/date.util';
import Router from 'next/router';

export function useEditor(event?: EventItem) {
  const newFetch = useFetch();

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
  const [category, setCategory] = useState<Category | '카테고리'>('카테고리');
  const [status, setStatus] = useState<string>('상태');

  const {
    editId,
    title,
    contents,
  }: { editId: string; title: string; contents: string } = useSelector(
    (state: RootState) => state.edit,
  );

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
    if (event) {
      setInitTitle(event.name);
      setInitMain(event.description);
      setEditorTitle(event.name);
      setMain(event.description);
      setStartDate(new Date(event.startDate));
      setEndDate(new Date(event.endDate));
      setCategory(event.category);
      setStatus(event.status);
    }
  }, [event]);

  const checkStyle = () => {
    editorMenuRef.current?.checkStyle();
  };

  const publish = async () => {
    const post = {
      startDate: getYYYYMMDD(startDate),
      endDate: getYYYYMMDD(endDate),
      name: editorTitle,
      nameText: titleEditor.current?.innerText || '',
      summary: mainEditor.current?.innerText.slice(0, 400) || '',
      description: main,
      category,
      status,
      done: false,
      bold: false,
      hidden: false,
      check: false,
    };

    if (editId === '') {
      const result = await newFetch.callApi({
        url: API.CREATE_EVENT,
        method: 'post',
        data: post,
      });

      if (result === null) return false;
    } else {
      const result = await newFetch.callApi({
        url: `${API.UPDATE_EVENT}/${editId}`,
        method: 'put',
        data: {
          id: editId,
          ...post,
        },
      });

      if (result === null) return false;
    }
    Router.push('/');
    return true;
  };

  return {
    selectedDate,
    startDate,
    endDate,
    category,
    status,
    editorMenuRef,
    publish,
    setSelectedDate,
    setCategory,
    setEndDate,
    setStartDate,
    setStatus,
    titleEditor,
    mainEditor,
    initMain,
    initTitle,
    setMain,
    setEditorTitle,
    checkStyle,
  };
}
