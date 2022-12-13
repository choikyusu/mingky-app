import React, { useState } from 'react';
import styled from 'styled-components';

export const LabelButton = (props: {
  name: string;
  children?: React.ReactNode;
  onClick?: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value?: string | number,
  ) => void;
}) => {
  const { name, children, onClick } = props;
  const [isOptionShow, setIsOptionShow] = useState(false);
  return (
    <Container
      className="section-toolbar-item"
      isOptionShow={isOptionShow}
      onClick={e => {
        setIsOptionShow(true);
        if (onClick) onClick();
      }}
      onMouseLeave={() => setIsOptionShow(false)}
    >
      <div className="section-toolbar-label-select-container">
        <button
          className={`section-font-size-toolbar-button ${
            isOptionShow ? 'actived' : ''
          }`}
          type="button"
        >
          <span className="section-toolbar-label">{name}</span>
        </button>
        {isOptionShow &&
          React.cloneElement(children as React.ReactElement, {
            setIsOptionShow,
          })}
      </div>
    </Container>
  );
};

const Container = styled.li<{ isOptionShow: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  flex: 0 0 auto;
  height: 100%;
  padding-right: 7px;
  height: 33px;

  .section-toolbar-label-select-container {
    position: relative;

    .section-font-size-toolbar-button {
      min-width: 55px;
      position: relative;
      height: 33px;
      padding-right: 32px;
      padding-left: 10px;
      text-align: left;

      &.actived:after {
        transform: rotate(180deg);
      }

      &:after {
        width: 1px;
        height: 1px;

        box-shadow: 0 2px 0 0 #999, -4px -2px 0 0 #999, 4px -2px 0 0 #999,
          -3px -1px 0 0 #999, 3px -1px 0 0 #999, -2px 0 0 0 #999, 2px 0 0 0 #999,
          -1px 1px 0 0 #999, 1px 1px 0 0 #999, 0 2px 0 0 #999, 0 2px 0 0 #999;

        content: '';
        position: absolute;
        top: 16px;
        right: 14px;
        margin: auto;
      }

      .section-toolbar-label {
        font-size: 12px;
      }
    }
  }
`;
