import { EditorMenu } from './EditorMenu/EditorMenu';
import { EditorBody } from './EditorBody/EditorBody';
import { useEditor } from './useEditor';

export function Editor(props: { event?: EventItem }) {
  const { event } = props;
  const newEditor = useEditor(event);

  return (
    <>
      <EditorMenu {...newEditor} />
      <EditorBody {...newEditor} />
    </>
  );
}
