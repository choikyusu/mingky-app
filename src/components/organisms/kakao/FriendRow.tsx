import { SetStateAction } from 'react';
import { BASE_IMG_URL } from '../../../constants/kakao/constants';

export const FriendRow = ({
  friend,
  setPopupProfile,
  onBlockDoubleClick,
}: {
  friend: UserProfile;
  setPopupProfile: (
    value: SetStateAction<
      | {
          type: ProfileWindowType;
          profile: UserProfile;
        }
      | undefined
    >,
  ) => void;
  onBlockDoubleClick: (type: RoomType, userId: string) => void;
}) => {
  return (
    <li onDoubleClick={() => onBlockDoubleClick('OneToOne', friend.userId)}>
      <img
        src={friend.profileUrl || BASE_IMG_URL}
        alt="profile"
        onClick={() => setPopupProfile({ type: 'Friend', profile: friend })}
      />
      <p>
        <b>{friend.nickName}</b>
      </p>
      <p>{friend.message}</p>
    </li>
  );
};
