import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';
import { Content } from './Content';
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  createRoom,
  fetchChatMessage,
} from '../../../../services/apis/chat.api.service';
import { useSocketIoProvider } from '../SocketIoProvider';

export const ChattingRoomContainer = forwardRef(
  ({
    showChat,
    setShowChat,
    profile,
    chatRoomRef,
  }: {
    showChat: boolean;
    setShowChat: Dispatch<SetStateAction<boolean>>;
    profile: UserInfo;
    chatRoomRef: React.MutableRefObject<any>;
  }) => {
    const { socketIo } = useSocketIoProvider();
    const [roomInfo, setRoomInfo] = useState<CreateRoomRequest>();
    const [messageList, setMessageList] = useState<MessageResponse[]>([]);

    useEffect(() => {
      if (roomInfo)
        fetchChatMessage(roomInfo.identifier, (success, messageResponse) => {
          if (success && messageResponse) setMessageList(messageResponse);
        });
    }, [roomInfo]);

    useImperativeHandle(chatRoomRef, () => ({
      connectRoom: (type: RoomType, userId: string) => {
        if (type === 'OneToOne') connectRoom(type, userId);
        else if (type === 'Individual') connectRoom(type, profile.userId);

        setShowChat(true);
      },
    }));

    function connectRoom(type: RoomType, userId: string) {
      socketIo.off('message');
      const memberList = [userId, profile.userId];

      const roomObj = {
        type,
        identifier: memberList.sort().join('-'),
        roomName: userId,
        participantList: [...new Set(memberList)],
      };

      if (roomObj)
        createRoom(roomObj, (success, createdRoom) => {
          if (success && createdRoom) {
            setRoomInfo(createdRoom);
            socketIo.emit('join', roomObj.identifier);
            socketIo.on('message', (response: MessageResponse) => {
              setMessageList(prev => [...prev, response]);
            });
          }
        });
    }

    if (!showChat || !roomInfo) return null;

    const onChatSumbmit = (message: string) => {
      const chattingRequset = {
        identifier: roomInfo.identifier,
        type: roomInfo.type,
        participantList: roomInfo.participantList,
        sendUserId: profile.userId,
        message,
        notRead: 0,
      };
      // 채팅방 참여자들에게 해당 메시지를 보냅니다.
      socketIo.emit('message', chattingRequset);
    };

    return (
      <Styled.Wrapper>
        <Header setShowChat={setShowChat} roomName={roomInfo.roomName} />
        <Content messageList={messageList} profile={profile} />
        <Footer onChatSumbmit={onChatSumbmit} />
      </Styled.Wrapper>
    );
  },
);

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99;
    width: 100%;
    height: 100vh;
    background: #b2c7d9;
  `,
};
