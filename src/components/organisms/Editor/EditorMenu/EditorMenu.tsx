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
        <Header>
          <div>타이틀</div>
          <HeaderMenu>
            <div className="header-button-container">
              <PublishButton onClick={publish}>발행</PublishButton>
              <Link href="/">
                <HomeButton>뒤로</HomeButton>
              </Link>
            </div>
          </HeaderMenu>
        </Header>
        <Toolbar {...props} {...newEditorMenu} />
        <ImageUpload menuRef={newEditorMenu.menuRef} />
      </Wrapper>
    );
  },
);

const Header = styled.div`
  height: 44px;
  position: relative;
  display: flex;
  flex: 1;
`;

const HeaderMenu = styled.div`
  right: 0;
  position: absolute;
`;

const PublishButton = styled.div`
  background-color: #00c73c;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  color: #fff;
  height: 30px;
  line-height: 28px;
  margin-left: 6px;
  padding-left: 13px;
  padding-right: 15px;
`;

const HomeButton = styled.div`
  background-color: #c8c8c8;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  color: #fff;
  height: 30px;
  line-height: 28px;
  margin-left: 6px;
  padding-left: 13px;
  padding-right: 15px;
`;

const Wrapper = styled.div`
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
