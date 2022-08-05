import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import stores, { RootState } from '../../../store/configureStore';
import { loginInfoActions } from '../../../store/modules/actions/loginInfo.action';
import { modalActions } from '../../../store/modules/actions/modal.action';
import { toast } from 'react-toastify';

export function Member() {
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

    // stores.dispatch(
    //   modalActions.setDialogStatus({
    //     id: 'CHANGE_NICK_NAME',
    //     data: {},
    //   }),
    // );

    toast('이름을 저장했습니다.');
  };

  return (
    <MemberWrapper>
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
    </MemberWrapper>
  );
}

const MemberWrapper = styled.div`
  .flex-area {
    display: flex;
    width: 100%;
    .nick-title {
      width: 200px;
    }
    .email-title {
      width: 200px;
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
  }
`;
