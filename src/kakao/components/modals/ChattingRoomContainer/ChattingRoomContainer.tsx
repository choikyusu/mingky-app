import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';
import { Content } from './Content';
import {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import {
  createRoom,
  fetchChatMessage,
} from '../../../services/apis/chat.api.service';
import { useSocketIoProvider } from '../../../provider/SocketIoProvider/SocketIoProvider';

interface ChattingRoomContainerProps {
  showChat: boolean;
  setShowChat: Dispatch<SetStateAction<boolean>>;
  profile: UserInfo;
}

export const ChattingRoomContainer = forwardRef(
  (
    { showChat, setShowChat, profile }: ChattingRoomContainerProps,
    ref: ForwardedRef<any>,
  ) => {
    const { socketIo } = useSocketIoProvider();
    const [roomInfo, setRoomInfo] = useState<CreateRoomRequest>();
    const [messageList, setMessageList] = useState<MessageResponse[]>([]);
    const [lastReadMessageList, setLastReadMessageList] = useState<
      LastMessageResponse[]
    >([]);

    useEffect(() => {
      if (roomInfo)
        fetchChatMessage(roomInfo.identifier, (success, messageResponse) => {
          if (success && messageResponse) setMessageList(messageResponse);
        });
    }, [roomInfo]);

    useImperativeHandle(ref, () => ({
      connectRoom: (type: RoomType, userId: string) => {
        if (type === 'OneToOne') connectRoom(type, userId);
        else if (type === 'Individual') connectRoom(type, profile.userId);

        setShowChat(true);
      },
    }));

    function connectRoom(type: RoomType, userId: string) {
      if (!socketIo) return;

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
            socketIo.emit('join', profile.userId, roomObj.identifier);
            socketIo.on('message', (response: MessageResponse) => {
              setMessageList(prev => [...prev, response]);
              socketIo.emit('readMessage', profile.userId, roomObj.identifier);
            });

            socketIo.on(
              'lastReadMessage',
              (response: LastMessageResponse[]) => {
                setLastReadMessageList(
                  response.filter(item => item.userId !== profile.userId),
                );
              },
            );
          }
        });
    }

    if (!showChat || !roomInfo) return null;

    const onChatSumbmit = (message: string) => {
      if (!socketIo) return;

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
        <Content
          messageList={messageList}
          profile={profile}
          lastReadChatNoList={lastReadMessageList?.map(
            message => message.lastReadChatNo,
          )}
        />
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
