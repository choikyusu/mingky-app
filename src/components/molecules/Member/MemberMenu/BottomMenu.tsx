import { useReducer } from 'react';
import styled from 'styled-components';
import { memberOptionList } from './BottomMenuList';

export function BottomMenu() {
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <BottomMenuWrapper>
      {memberOptionList.map(item => {
        const Icon = item.linkType();

        return (
          <MenuItem>
            <div className="title">{item.title}</div>
            <div className="sub-title">{item.subTitle}</div>
            <div
              className="link-type"
              onMouseDown={() => {
                if (item.doClick) item.doClick();
                forceUpdate();
              }}
              role="button"
              tabIndex={0}
            >
              <Icon />
            </div>
          </MenuItem>
        );
      })}
    </BottomMenuWrapper>
  );
}

const BottomMenuWrapper = styled.div``;

const MenuItem = styled.div`
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
