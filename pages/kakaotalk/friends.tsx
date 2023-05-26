import styled from 'styled-components';
import withAuth from '../../src/auth/WithAuth';
import MenuSideBar from '../../src/components/organisms/kakao/MenuSideBar';
import { useEffect, useState } from 'react';
import { myProfile } from '../../src/services/apis/user.api.service';
import { ProfileContainer } from '../../src/components/organisms/kakao/ProfileContainer';
import { BASE_IMG_URL } from '../../src/constants/kakao/constants';
import { FindFriendWindow } from '../../src/components/organisms/kakao/FindFriendWindow';
import { FriendPanel } from '../../src/components/organisms/kakao/FriendPanel';
import { ChattingRoomContainer } from '../../src/components/organisms/kakao/chat/ChattingRoomContainer';
import { createRoom } from '../../src/services/apis/chat.api.service';
import { useSocketIoProvider } from '../../src/components/organisms/kakao/SocketIoProvider';

const Menu = () => {
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
    const memberList = [userId, profile.userId];

    const roomObj = {
      type,
      identifier: memberList.sort().join('-'),
      roomName: userId,
      participantList: [...new Set(memberList)],
    };

    setRoomInfo(roomObj);

    if (roomObj)
      createRoom(roomObj, success => {
        if (success) {
          socketIo.emit('join', roomObj.identifier);
          socketIo.on('message', (response: string) => {
            console.log(response);
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
      />
      <Styled.Container>
        <MenuSideBar />
        <Styled.Main>
          <FindFriendWindow
            isopenFindFriend={isopenFindFriend}
            openFindFriend={openFindFriend}
          />
          <Styled.MainHeader>
            <Styled.TitleBlock>
              <h2>친구</h2>
              <i
                aria-hidden
                className="fas fa-user-plus"
                title="친구 추가"
                onClick={() => openFindFriend(true)}
              />
            </Styled.TitleBlock>
            <input placeholder="이름 검색" onChange={onSearchChange} />
          </Styled.MainHeader>
          <Styled.Contents>
            <Styled.MyProfileBlock
              onDoubleClick={() =>
                onBlockDoubleClick('Individual', profile.userId)
              }
            >
              <img
                src={profile?.profileUrl || BASE_IMG_URL}
                alt="profile"
                onClick={() => setPopupProfile({ type: 'Me', profile })}
              />
              <p>
                <b>{profile?.nickName}</b>
              </p>
              <p>{profile?.message}</p>
            </Styled.MyProfileBlock>
            <Styled.FriendsBorder>
              <p>{`친구 ${profile?.friendList.length}`}</p>
            </Styled.FriendsBorder>
            <ul>
              <FriendPanel
                friendList={profile?.friendList
                  .filter(friend => friend.nickName.includes(search))
                  .sort()}
                setPopupProfile={setPopupProfile}
                onBlockDoubleClick={onBlockDoubleClick}
              />
            </ul>
          </Styled.Contents>
        </Styled.Main>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

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
  `,
  MyProfileBlock: styled.div`
    position: relative;
    padding: 25px 10px 25px 185px;
    & img {
      position: absolute;
      top: 18px;
      left: 120px;
      width: 50px;
      height: 50px;
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
