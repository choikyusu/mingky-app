import { SetStateAction } from 'react';
import { BASE_IMG_URL } from '../../../constants/kakao/constants';

export const FriendRow = ({
  friend,
  setPopupProfile,
}: {
  friend: UserProfile;
  setPopupProfile: (value: SetStateAction<UserProfile | undefined>) => void;
}) => {
  return (
    <li>
      <img
        src={friend.profileUrl || BASE_IMG_URL}
        alt="profile"
        onClick={() => setPopupProfile(friend)}
      />
      <p>
        <b>{friend.nickName}</b>
      </p>
      <p>{friend.message}</p>
    </li>
  );
};
