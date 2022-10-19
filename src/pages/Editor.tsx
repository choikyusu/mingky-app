import { useRef } from 'react';
import styled from 'styled-components';

export function Editor() {
  const imgSelector: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

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
            const value = parseInt(e.target.value, 10);

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
      </div>
      <div id="editor-title" contentEditable="true" />
      <div id="editor-main" contentEditable="true" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  #editor-title {
    padding: 16px 24px;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
  }
  #img-selector {
    display: none;
  }
`;
