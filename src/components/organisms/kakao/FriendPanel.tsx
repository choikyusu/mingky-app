import { SetStateAction } from 'react';
import { FriendRow } from './FriendRow';

export const FriendPanel = ({
  friendList,
  setPopupProfile,
  onBlockDoubleClick,
}: {
  friendList: UserProfile[] | undefined;
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
  if (!friendList) return null;
  return (
    <>
      {friendList.map(friend => (
        <FriendRow
          friend={friend}
          setPopupProfile={setPopupProfile}
          onBlockDoubleClick={onBlockDoubleClick}
        />
      ))}
    </>
  );
};
