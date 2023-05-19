import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

export const Portal = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: "";  top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);
  // id가 modal인 DOM 노드에 모달 창을 render합니다.
  const rootElement = document.getElementById('modal') as Element;
  return createPortal(children, rootElement);
};

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Styled.Overlay />
      <Styled.Wrapper>{children}</Styled.Wrapper>
    </>
  );
};

const Styled = {
  Overlay: styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #c8c8c8;
    opacity: 0.5;
    z-index: 99;
    overflow: hidden;
  `,
  Wrapper: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  `,
};
