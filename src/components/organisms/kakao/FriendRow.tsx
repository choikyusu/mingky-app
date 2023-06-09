import { BASE_IMG_URL } from '../../../constants/kakao/constants';

export const FriendRow = ({
  friend,
  onImageClick,
  onBlockDoubleClick,
}: {
  friend: UserProfile;
  onImageClick: (type: RoomType, friendProfile: UserProfile) => void;
  onBlockDoubleClick: (type: RoomType, userId: string) => void;
}) => {
  return (
    <li onDoubleClick={() => onBlockDoubleClick('OneToOne', friend.userId)}>
      <img
        src={friend.profileUrl || BASE_IMG_URL}
        alt="profile"
        onClick={() => onImageClick('OneToOne', friend)}
      />
      <p>
        <b>{friend.nickName}</b>
      </p>
      <p>{friend.message}</p>
    </li>
  );
};
