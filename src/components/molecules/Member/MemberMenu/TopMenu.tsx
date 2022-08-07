import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import stores, { RootState } from '../../../../store/configureStore';
import { loginInfoActions } from '../../../../store/modules/actions/loginInfo.action';

export function TopMenu() {
  const userInfo: UserInfoType = useSelector(
    (state: RootState) => state.loginInfo.userInfo,
  );
  const [name, setName] = useState(userInfo.name);
  const nameRef = useRef<HTMLInputElement>(null);

  const update = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const save = () => {
    stores.dispatch(loginInfoActions.setName({ name }));
    toast('이름을 저장했습니다.');
  };
  return (
    <TopMenuWrapper>
      <div className="flex-area">
        <input
          type="text"
          className="nick-title"
          ref={nameRef}
          value={name}
          onChange={update}
        />
        <div
          className="save-button"
          role="button"
          onMouseDown={save}
          onKeyDown={save}
          tabIndex={0}
        >
          저장
        </div>
      </div>
      <div className="flex-area">
        <div className="email-title">{userInfo.email}</div>
        <div className="save-button">알람</div>
      </div>
    </TopMenuWrapper>
  );
}

const TopMenuWrapper = styled.div`
  border-bottom: 3px solid #c8c8c8;
  padding-bottom: 5px;
  margin-bottom: 5px;
  .flex-area {
    display: flex;
    width: 100%;
    margin-bottom: 5px;
    .nick-title {
      width: 200px;
      padding: 0px;
      border-width: 0px;
    }
    .email-title {
      width: 200px;
      text-align: left;
    }
  }

  .save-button {
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    background: #0076ce;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    color: #ffffff;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
  }
`;
