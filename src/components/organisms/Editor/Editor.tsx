import { EditorMenu } from './EditorMenu/EditorMenu';
import { EditorBody } from './EditorBody/EditorBody';
import { useEditor } from './useEditor';

export function Editor(props: { event?: EventItem }) {
  const { event } = props;
  const newEditor = useEditor(event);

  return (
    <>
      <EditorMenu
        selectedDate={newEditor.selectedDate}
        startDate={newEditor.startDate}
        endDate={newEditor.endDate}
        category={newEditor.category}
        status={newEditor.status}
        editorMenuRef={newEditor.editorMenuRef}
        publish={newEditor.publish}
        backHome={newEditor.backHome}
        setSelectedDate={newEditor.setSelectedDate}
        setCategory={newEditor.setCategory}
        setEndDate={newEditor.setEndDate}
        setStartDate={newEditor.setStartDate}
        setStatus={newEditor.setStatus}
      />
      <EditorBody
        titleEditor={newEditor.titleEditor}
        mainEditor={newEditor.mainEditor}
        initMain={newEditor.initMain}
        initTitle={newEditor.initTitle}
        setMain={newEditor.setMain}
        setEditorTitle={newEditor.setEditorTitle}
        checkStyle={newEditor.checkStyle}
      />
    </>
  );
}
