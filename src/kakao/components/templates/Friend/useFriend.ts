import { useRef } from 'react';

export const useFriend = () => {
  const chatRoomRef: React.MutableRefObject<any> = useRef({});
  const profileRef: React.MutableRefObject<any> = useRef({});

  const onBlockDoubleClick = (type: RoomType, userId: string) => {
    chatRoomRef.current.connectRoom(type, userId);
  };

  const onImageClick = (type: RoomType, friendProfile: UserProfile) => {
    profileRef.current.setPopupProfile(type, friendProfile);
  };

  return {
    chatRoomRef,
    onBlockDoubleClick,
    profileRef,
    onImageClick,
  };
};
