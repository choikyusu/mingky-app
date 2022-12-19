import React from 'react';
import { useState } from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

export const NormalButton = (props: {
  name: string;
  buttonRef?: React.MutableRefObject<HTMLButtonElement | null>;
  onClick?: (type: string, value?: string) => void;
  children?: React.ReactNode;
  Icon: IconType;
}) => {
  const { name, buttonRef, onClick, children, Icon } = props;
  const [isOptionShow, setIsOptionShow] = useState(false);

  return (
    <Container
      className="section-toolbar-item"
      onClick={e => {
        if (onClick) onClick(name);
        if (children) setIsOptionShow(true);
      }}
      onMouseLeave={() => setIsOptionShow(false)}
    >
      <button
        className="section-toolbar-item-button"
        type="button"
        ref={buttonRef}
      >
        <Icon className="section-toolbar-icon" />
      </button>
      {isOptionShow &&
        children &&
        React.cloneElement(children as React.ReactElement, {
          setIsOptionShow,
        })}
    </Container>
  );
};

const Container = styled.li`
  &.section-toolbar-item {
    display: flex;
    align-items: center;
    position: relative;
    flex: 0 0 auto;
    height: 100%;
    padding-right: 7px;
    height: 33px;

    .section-toolbar-item-button {
      &.active {
        color: #3cc83c;
      }
      padding: 0;
      background-color: transparent;
      border: 0;
      cursor: pointer;
      font: inherit;
      border-radius: 0;
      outline: 0;
      box-sizing: border-box;
      .section-toolbar-icon {
        color: inherit;
        width: 21px;
        height: 21px;
        display: inline-block;
        &:hover {
          color: #3cc83c;
        }
      }
    }
  }
`;
