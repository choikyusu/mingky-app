import styled from 'styled-components';
import { BASE_IMG_URL } from '../../../constants/kakao/constants';

export const FindFriendProfile = ({
  userId,
  foundUser,
}: {
  userId: string;
  foundUser: UserInfo | null | undefined;
}) => {
  if (foundUser === undefined) return null;
  return foundUser ? (
    <Styled.FoundUserProfile>
      <img src={foundUser.baseUrl || BASE_IMG_URL} alt="profile_img" />
      <p>{foundUser.name}</p>
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
};
