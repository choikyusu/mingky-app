import { SetStateAction } from 'react';
import { FriendRow } from './FriendRow';

export const FriendPanel = ({
  friendList,
  setPopupProfile,
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
}) => {
  if (!friendList) return null;
  return (
    <>
      {friendList.map(friend => (
        <FriendRow friend={friend} setPopupProfile={setPopupProfile} />
      ))}
    </>
  );
};
