import React from 'react';
import { Editor } from '../../src/components/organisms/Editor/Editor';
import EditorProvider from '../../src/components/organisms/Editor/EditorProvider';

export default function Edit() {
  return (
    <EditorProvider>
      <Editor />
    </EditorProvider>
  );
}
