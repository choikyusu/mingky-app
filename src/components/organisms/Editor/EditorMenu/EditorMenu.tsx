import { forwardRef } from 'react';
import styled from 'styled-components';
import { useEditorMenu } from './useEditorMenu';
import { Toolbar } from './Toolbar/Toolbar';
import { ImageUpload } from './ImageUpload';
import Link from 'next/link';

export const EditorMenu = forwardRef(
  (props: {
    editorMenuRef: React.MutableRefObject<any>;
    publish: () => void;
  }) => {
    const { editorMenuRef, publish } = props;

    const newEditorMenu = useEditorMenu({ editorMenuRef });

    return (
      <Wrapper>
        <div className="header">
          <div>타이틀</div>
          <div className="header-menu">
            <div className="header-button-container">
              <button
                className="publish-button"
                type="button"
                onClick={() => publish()}
              >
                발행
              </button>
              <Link href="/">
                <button className="home-button" type="button">
                  뒤로
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Toolbar {...props} {...newEditorMenu} />
        <ImageUpload menuRef={newEditorMenu.menuRef} />
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  .header {
    height: 44px;
    position: relative;
    display: flex;
    flex: 1;
    .header-menu {
      right: 0;
      position: absolute;
      .publish-button {
        background-color: #00c73c;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
        color: #fff;
        height: 30px;
        line-height: 28px;
        margin-left: 6px;
        padding-left: 13px;
        padding-right: 15px;
      }
      .home-button {
        background-color: #c8c8c8;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
        color: #fff;
        height: 30px;
        line-height: 28px;
        margin-left: 6px;
        padding-left: 13px;
        padding-right: 15px;
      }
    }
  }

  ul {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    font: inherit;
    border-radius: 0;
    outline: 0;
    box-sizing: border-box;

    &.active {
      background-color: purple;
      color: #fff;
    }
  }

  #editor-menu {
    display: flex;
  }
`;
