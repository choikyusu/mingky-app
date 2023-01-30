import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../constants/api.constant';
import useFetch from '../../../hooks/useFetch';
import { RootState } from '../../../store/configureStore';
import { getYYYYMMDD } from '../../../utils/date.util';
import Router from 'next/router';
import { useEditorState } from './EditorProvider';

export function useEditor(event?: EventItem) {
  const editorProvider = useEditorState();

  const newFetch = useFetch();

  const mainEditor: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const titleEditor: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const editorMenuRef: React.MutableRefObject<any> = useRef({});

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
        editorProvider.setInitMain(contents);
        editorProvider.setMain(contents);
      }
      if (title !== '') {
        editorProvider.setInitTitle(title);
        editorProvider.setEditorTitle(title);
      }
    })();
  }, [title, contents]);

  useEffect(() => {
    if (event) {
      editorProvider.setInitTitle(event.name);
      editorProvider.setInitMain(event.description);
      editorProvider.setEditorTitle(event.name);
      editorProvider.setMain(event.description);
      editorProvider.setStartDate(new Date(event.startDate));
      editorProvider.setEndDate(new Date(event.endDate));
      editorProvider.setCategory(event.category);
      editorProvider.setStatus(event.status);
    }
  }, [event]);

  const checkStyle = () => {
    editorMenuRef.current?.checkStyle();
  };

  const publish = async () => {
    const post = {
      startDate: getYYYYMMDD(editorProvider.startDate),
      endDate: getYYYYMMDD(editorProvider.endDate),
      name: editorProvider.editorTitle,
      nameText: titleEditor.current?.innerText || '',
      summary: mainEditor.current?.innerText.slice(0, 400) || '',
      description: editorProvider.main,
      category: editorProvider.category,
      status: editorProvider.status,
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
    editorMenuRef,
    publish,
    checkStyle,
    mainEditor,
    titleEditor,
  };
}
