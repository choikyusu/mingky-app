import { useReducer } from 'react';
import styled from 'styled-components';
import { memberOptionList } from './BottomMenuList';

function MenuItem(props: SettingsMenu) {
  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  const Icon = props.linkType();
  return (
    <Wrapper>
      <div className="title">{props.title}</div>
      <div className="sub-title">{props.subTitle}</div>
      <div
        className="link-type"
        onMouseDown={() => {
          if (props.doClick) props.doClick();
          forceUpdate();
        }}
        role="button"
        tabIndex={0}
      >
        <Icon />
      </div>
    </Wrapper>
  );
}

export function BottomMenu() {
  return (
    <BottomMenuWrapper>
      {memberOptionList.map((item: SettingsMenu) => {
        return <MenuItem {...item} />;
      })}
    </BottomMenuWrapper>
  );
}

const BottomMenuWrapper = styled.div``;

const Wrapper = styled.div`
  display: flex;
  font-size: 0.8em;
  border-bottom: 2px solid #e8e8e8;
  padding: 10px 0px 10px 0px;
  .title {
    width: 30%;
    text-align: left;
  }
  .sub-title {
    width: 50%;
    font-size: 0.5em;
    text-align: left;
  }
  .link-type {
    font-size: 2em;
    width: 20%;
    cursor: pointer;
  }
`;
