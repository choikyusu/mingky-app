import React, { createContext, useContext, useMemo, useState } from 'react';
import { getToday } from '../../../utils/date.util';

type EditorState = {
  id: string;
  initTitle: string;
  initMain: string;
  editorTitle: string;
  main: string;
  selectedDate: string;
  startDate: Date;
  endDate: Date;
  category: Category | '카테고리';
  status: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setInitTitle: React.Dispatch<React.SetStateAction<string>>;
  setInitMain: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setEditorTitle: React.Dispatch<React.SetStateAction<string>>;
  setMain: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  setCategory: React.Dispatch<React.SetStateAction<'카테고리' | Category>>;
};

const EditorStateContext = createContext<EditorState | null>(null);

export default function EditorProvider(props: {
  children: React.ReactNode;
  post?: { title: string; contents: string };
}) {
  const { children, post } = props;

  const [id, setId] = useState<string>('');
  const [initTitle, setInitTitle] = useState<string>(post?.title || '');
  const [initMain, setInitMain] = useState<string>(post?.contents || '');
  const [editorTitle, setEditorTitle] = useState<string>(post?.title || '');
  const [main, setMain] = useState<string>(post?.contents || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date(getToday()));
  const [endDate, setEndDate] = useState<Date>(new Date(getToday()));
  const [category, setCategory] = useState<Category | '카테고리'>('카테고리');
  const [status, setStatus] = useState<string>('상태');

  const value = useMemo(
    () => ({
      id,
      initTitle,
      initMain,
      editorTitle,
      main,
      selectedDate,
      startDate,
      endDate,
      category,
      status,
      setId,
      setInitTitle,
      setInitMain,
      setEditorTitle,
      setMain,
      setSelectedDate,
      setStartDate,
      setEndDate,
      setCategory,
      setStatus,
    }),
    [
      initTitle,
      initMain,
      editorTitle,
      main,
      selectedDate,
      startDate,
      endDate,
      category,
      status,
    ],
  );

  return (
    <EditorStateContext.Provider value={value}>
      {children}
    </EditorStateContext.Provider>
  );
}

export function useEditorState() {
  const state = useContext(EditorStateContext);
  if (!state) throw new Error('Cannot find editorProvider');
  return state;
}
