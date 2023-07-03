import { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { MainContainerProps } from './MainContainer';
import { myProfile } from '@/src/kakao/services/apis/user.api.service';

export const useMainContainer = ({ children }: MainContainerProps) => {
  const chatRoomRef: React.MutableRefObject<any> = useRef({});
  const profileRef: React.MutableRefObject<any> = useRef({});
  const [profile, setProfile] = useState<UserInfo>({
    userId: '',
    name: '',
    nickName: '',
    message: '',
    profileUrl: '',
    backgroundUrl: '',
    friendList: [],
  });

  const onBlockDoubleClick = (type: RoomType, userId: string) => {
    chatRoomRef.current.connectRoom(type, userId);
  };

  const onImageClick = (type: RoomType, friendProfile: UserProfile) => {
    profileRef.current.setPopupProfile(type, friendProfile);
  };

  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    myProfile((success: boolean, userInfo?: UserInfo) => {
      if (success && userInfo) {
        setProfile(userInfo);
      }
    });
  }, []);

  const renderChildrenWithProps = () => {
    return Children.map(children, child => {
      return cloneElement(child, {
        profile,
        onBlockDoubleClick,
        onImageClick,
      });
    });
  };

  return {
    profile,
    setProfile,
    profileRef,
    showChat,
    setShowChat,
    chatRoomRef,
    renderChildrenWithProps,
  };
};
