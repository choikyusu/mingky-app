import styled from 'styled-components';
import withAuth from '../../src/auth/WithAuth';
import MenuSideBar from '../../src/components/organisms/kakao/MenuSideBar';
import {
  MyChatRoomList,
  createRoom,
} from '../../src/services/apis/chat.api.service';
import { useEffect, useState } from 'react';
import { BASE_IMG_URL } from '../../src/constants/kakao/constants';
import { useSocketIoProvider } from '../../src/components/organisms/kakao/SocketIoProvider';
import { ProfileContainer } from '../../src/components/organisms/kakao/ProfileContainer';
import { ChattingRoomContainer } from '../../src/components/organisms/kakao/chat/ChattingRoomContainer';
import { myProfile } from '../../src/services/apis/user.api.service';

const Menu = () => {
  const [roomList, setRoomList] = useState<ParticipantResponse[]>([]);

  useEffect(() => {
    MyChatRoomList((success, responseRoomList) => {
      if (success && responseRoomList) setRoomList(responseRoomList);
    });
  }, []);

  const [profile, setProfile] = useState<UserInfo>({
    userId: '',
    name: '',
    nickName: '',
    message: '',
    profileUrl: '',
    backgroundUrl: '',
    friendList: [],
  });

  const { socketIo } = useSocketIoProvider();
  const [showChat, setShowChat] = useState(false);
  const [search, setSearch] = useState('');
  const [roomInfo, setRoomInfo] = useState<CreateRoomRequest>();
  const [messageList, setMessageList] = useState<MessageResponse[]>([]);

  const [popupProfile, setPopupProfile] = useState<{
    type: ProfileWindowType;
    profile: UserProfile;
  }>();
  const [isopenFindFriend, openFindFriend] = useState(false);
  useEffect(() => {
    if (!isopenFindFriend)
      myProfile((success: boolean, userInfo?: UserInfo) => {
        if (success && userInfo) {
          setProfile(userInfo);
        }
      });
  }, [isopenFindFriend]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const onBlockDoubleClick = (type: RoomType, userId: string) => {
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
          setShowChat(true);
        }
      });
  };

  return (
    <Styled.Wrapper>
      <ProfileContainer
        profile={profile}
        popupProfile={popupProfile}
        setPopupProfile={setPopupProfile}
        setProfile={setProfile}
      />
      <ChattingRoomContainer
        showChat={showChat}
        setShowChat={setShowChat}
        roomInfo={roomInfo}
        profile={profile}
        setMessageList={setMessageList}
        messageList={messageList}
      />
      <Styled.Container>
        <MenuSideBar />
        <Styled.Main>
          <Styled.MainHeader>
            <Styled.TitleBlock>
              <h2>채팅</h2>
              <i className="fas fa-comment-medical" title="새로운 채팅" />
            </Styled.TitleBlock>
            <input placeholder="채팅방 이름, 참여자 검색" />
          </Styled.MainHeader>
          <Styled.Contents>
            {roomList.map(room => (
              <li>
                <img
                  src={
                    room.roomObjectId?.participantList[0]?.userObjectId
                      ?.profileUrl || BASE_IMG_URL
                  }
                  alt="profile"
                />
                <p className="room-block-top">
                  <b>{room.roomName}</b>
                </p>
                <p className="preview">
                  {room.roomObjectId.lastChat}
                  <Notification>1</Notification>
                </p>
              </li>
            ))}
          </Styled.Contents>
        </Styled.Main>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

const Notification = styled.span`
  position: absolute;
  display: inline-block;
  padding: 3px;
  color: #fff;
  background-color: #ff513d;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  min-width: 25px;
  text-align: center;
`;

const Styled = {
  Wrapper: styled.div`
    width: 100%;
  `,
  Container: styled.main`
    width: 100%;
    display: flex;
  `,

  Main: styled.main`
    padding-left: 100px;
    width: 100%;
    min-height: 100vh;
  `,
  MainHeader: styled.section`
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px 20px 0px 120px;
    width: 100%;
    height: 100px;
    background-color: #fff;
    z-index: 1;
    & input {
      border: none;
      outline: none;
      border-radius: 10px;
      background-color: #f6f6f7;
      width: 100%;
      padding: 5px 10px;
      &:focus {
        &::placeholder {
          color: #f6f6f7;
        }
      }
    }
  `,
  TitleBlock: styled.section`
    position: relative;
    & h2 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    & i {
      cursor: pointer;
      font-size: 20px;
      position: absolute;
      top: 5px;
      right: 0;
    }
  `,
  Contents: styled.section`
    position: absolute;
    top: 100px;
    bottom: 5px;
    left: 0px;
    width: 100%;
    overflow: auto;
    & li {
      position: relative;
      padding: 20px 100px 20px 180px;
      & img {
        position: absolute;
        top: 18px;
        left: 120px;
        width: 45px;
        height: 45px;
        border-radius: 15px;
        cursor: pointer;
      }
      & p {
        color: #707070;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-height: 19px;
        font-size: 12px;
        & b {
          color: #000;
          font-weight: bold;
          font-size: 14px;
        }
      }
      &:hover {
        background-color: #eaeaeb;
      }
    }

    & li {
      padding: 10px 20px 10px 180px;
    }
    & .preview {
      position: relative;
      height: 40px;
      word-wrap: break-word;
      white-space: pre-wrap;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding-right: 80px;
      & ${Notification} {
        top: 0;
        right: 5px;
        padding: 3px;
      }
    }
    & .room-block-top {
      position: relative;
      & span {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  `,
  FriendsBorder: styled.div`
    border-top: 0.5px solid #dcdcdc;
    margin: 10px 20px 0 120px;
    padding-top: 10px;
    & p {
      font-size: 12px;
      color: #b4b4b4;
    }
  `,
};

export default withAuth(Menu);
