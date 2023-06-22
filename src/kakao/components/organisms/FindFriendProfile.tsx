import styled from 'styled-components';
import { BASE_IMG_URL } from '../../constants/constants';
import { SetStateAction } from 'react';
import { addFriend } from '../../services/apis/friend.api.service';

interface FindFriendProfileProps {
  userId: string;
  foundUser: UserInfo | null | undefined;
  openFindFriend: (value: SetStateAction<boolean>) => void;
}

export const FindFriendProfile = ({
  userId,
  foundUser,
  openFindFriend,
}: FindFriendProfileProps) => {
  const onAddFriendClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (foundUser) {
      try {
        await addFriend(foundUser.userId, success => {
          if (success) openFindFriend(false);
        });
      } catch (err) {
        alert('친구 추가를 실패했습니다.');
      }
    }
  };

  if (foundUser === undefined) return null;
  return foundUser ? (
    <Styled.FoundUserProfile>
      <img src={foundUser.profileUrl || BASE_IMG_URL} alt="profile_img" />
      <p>{foundUser.name}</p>
      <Styled.Button onClick={onAddFriendClick}>친구 추가</Styled.Button>
    </Styled.FoundUserProfile>
  ) : (
    <Styled.FindNull>
      <p>{`${userId}를 찾을 수 없습니다.`}</p>
    </Styled.FindNull>
  );
};

const Styled = {
  FoundUserProfile: styled.div`
    margin-top: 50px;
    & img {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 35px;
      margin: auto;
    }

    & p {
      text-align: center;
      padding-top: 10px;
    }
  `,
  FindNull: styled.div`
    text-align: center;
    & p {
      padding-top: 50px;
      font-size: 15px;
      font-weight: bold;
    }
  `,
  Button: styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: inline-block;
    padding: 10px;
    background: #fee500;
    &:hover {
      background: #fada0a;
      cursor: pointer;
    }
  `,
};
