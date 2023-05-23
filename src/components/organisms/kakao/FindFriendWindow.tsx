import styled from 'styled-components';
import { Modal } from './Modal';
import { FindFriendProfile } from './FindFriendProfile';
import { Dispatch, SetStateAction, useState } from 'react';
import { findUser } from '../../../services/apis/user.api.service';

export const FindFriendWindow = ({
  isopenFindFriend,
  openFindFriend,
}: {
  isopenFindFriend: boolean;
  openFindFriend: Dispatch<SetStateAction<boolean>>;
}) => {
  const MAX_LEN = 20;
  const [userId, setUserId] = useState('');
  const [findUserId, setFindUserId] = useState('');
  const [foundUser, setFoundUser] = useState<UserInfo | null | undefined>(
    undefined,
  );

  const onIdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    if (value.length <= 20) {
      setUserId(event.target.value);
    }
    if (value.length === 0) {
      setFoundUser(undefined);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await findUser(userId, (success, userInfo) => {
      if (success) setFoundUser(userInfo);
      setFindUserId(userId);
    });
  };

  if (!isopenFindFriend) return null;
  return (
    <Modal>
      <Styled.Wrapper>
        <Styled.CancelIcon
          className="fas fa-times"
          onClick={() => openFindFriend(false)}
        />
        <h4>친구 추가</h4>
        <Styled.Menu>
          <span>ID로 추가</span>
        </Styled.Menu>
        <form onSubmit={onSubmit}>
          <input
            value={userId}
            maxLength={MAX_LEN}
            onChange={onIdInputChange}
          />
          <span>{`${userId.length}/${MAX_LEN}`}</span>
        </form>
        <FindFriendProfile userId={findUserId} foundUser={foundUser} />
      </Styled.Wrapper>
    </Modal>
  );
};

const Styled = {
  Wrapper: styled.div`
    width: 360px;
    height: 450px;
    border: 1px solid #646464;
    margin: auto;
    color: #000;
    background: #fff;
    & h4 {
      padding: 25px 20px;
      font-size: 18px;
      font-weight: 600;
    }

    & form {
      width: 90%;
      border-bottom: 2px solid #000;
      margin: 30px auto;
      & input,
      span {
        padding: 5px;
      }
      & input {
        width: 85%;
        outline: none;
        border: none;
      }
      & span {
        display: inline-block;
        width: 15%;
        text-align: center;
      }
    }
  `,
  CancelIcon: styled.i`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 15px;
    color: #000;
    z-index: 100;
    cursor: pointer;
  `,
  Menu: styled.div`
    padding: 0 20px;
    border-bottom: 1px solid #dcdcdc;
    & span {
      display: inline-block;
      font-size: 13px;
      font-weight: bold;
      border-bottom: 1px solid #000;
      padding: 10px 0;
    }
  `,
};
