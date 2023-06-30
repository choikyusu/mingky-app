import { FriendRow } from '../../elements/FriendRow/FriendRow';

interface FriendPanelProps {
  friendList: UserProfile[] | undefined;
  onImageClick: (type: RoomType, friendProfile: UserProfile) => void;
  onBlockDoubleClick: (type: RoomType, userId: string) => void;
}

export const FriendPanel = ({
  friendList,
  onImageClick,
  onBlockDoubleClick,
}: FriendPanelProps) => {
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
