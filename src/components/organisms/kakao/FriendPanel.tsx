import { FriendRow } from './FriendRow';

export const FriendPanel = ({
  friendList,
  onImageClick,
  onBlockDoubleClick,
}: {
  friendList: UserProfile[] | undefined;
  onImageClick: (type: RoomType, friendProfile: UserProfile) => void;
  onBlockDoubleClick: (type: RoomType, userId: string) => void;
}) => {
  if (!friendList) return null;
  return (
    <>
      {friendList.map(friend => (
        <FriendRow
          friend={friend}
          onImageClick={onImageClick}
          onBlockDoubleClick={onBlockDoubleClick}
        />
      ))}
    </>
  );
};
