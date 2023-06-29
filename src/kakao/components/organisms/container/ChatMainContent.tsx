import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BASE_IMG_URL } from '../../../constants/env.constants';
import { NewChattingWindow } from '../NewChattingWindow/NewChattingWindow';
import { formatDate } from '../../../utils/date.util';
import { useSocketIoProvider } from '../provider/SocketIoProvider';
import { MyChatRoomList } from '../../../services/apis/chat.api.service';

interface ChatMainContentProps {
  profile?: UserInfo;
  onBlockDoubleClick: (type: RoomType, userId: string) => void;
  onImageClick: (type: RoomType, friendProfile: UserProfile) => void;
}

const ChatMainContent = ({
  profile,
  onBlockDoubleClick,
  onImageClick,
}: ChatMainContentProps) => {
  const { socketIo } = useSocketIoProvider();
  const [roomList, setRoomList] = useState<ParticipantResponse[]>([]);

  useEffect(() => {
    MyChatRoomList((success, responseRoomList) => {
      if (success && responseRoomList) setRoomList(responseRoomList);
    });
  }, []);

  const [search, setSearch] = useState('');
  const [isopenFindFriend, openFindFriend] = useState(false);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (socketIo && profile) {
      socketIo.emit('roomUpdate', profile.userId);
    }
    return () => {
      if (socketIo) socketIo.off('roomUpdate');
    };
  }, [profile]);

  useEffect(() => {
    if (socketIo && profile) {
      socketIo.on('roomUpdate', (response: ParticipantResponse) => {
        const newResponse = {
          ...response,
          roomObjectId: {
            ...response.roomObjectId,
            participantList: response.roomObjectId.participantList.filter(
              participant =>
                participant.userId !== profile.userId ||
                response.roomObjectId.type !== 'OneToOne',
            ),
          },
        };

        const newRoomList = [
          ...roomList.filter(room => room._id !== response._id),
          newResponse,
        ];

        setRoomList(newRoomList);
      });
    }
  }, [profile, roomList]);

  if (!profile) return null;
  return (
    <Styled.Main>
      <NewChattingWindow
        isopenFindFriend={isopenFindFriend}
        openFindFriend={openFindFriend}
      />
      <Styled.MainHeader>
        <Styled.TitleBlock>
          <h2>채팅</h2>
          <i
            aria-hidden
            className="fas fa-comment-medical"
            title="새로운 채팅"
            onClick={() => openFindFriend(true)}
          />
        </Styled.TitleBlock>
        <input
          placeholder="채팅방 이름, 참여자 검색"
          onChange={onSearchChange}
        />
      </Styled.MainHeader>
      <Styled.Contents>
        {roomList
          .sort((a, b) => {
            const time1 = formatDate(
              a.roomObjectId.lastMessageObjectId.createdAt,
              'YYYYMMDDhhmmss',
            );
            const time2 = formatDate(
              b.roomObjectId.lastMessageObjectId.createdAt,
              'YYYYMMDDhhmmss',
            );

            return time1 > time2 ? -1 : 1;
          })
          .filter(room =>
            room.roomObjectId.participantList[0]?.userObjectId.nickName.includes(
              search,
            ),
          )
          .map(room => {
            const notReadMessageCount =
              room.roomObjectId.lastMessageObjectId.index - room.lastReadChatNo;

            return (
              <li
                onDoubleClick={() =>
                  onBlockDoubleClick(
                    room.roomObjectId.type,
                    room.roomObjectId.participantList[0]?.userId,
                  )
                }
              >
                <img
                  src={
                    room.roomObjectId?.participantList[0]?.userObjectId
                      ?.profileUrl || BASE_IMG_URL
                  }
                  onClick={() =>
                    onImageClick(
                      room.roomObjectId.type,
                      room.roomObjectId?.participantList[0]?.userObjectId,
                    )
                  }
                  alt="profile"
                />
                <p className="room-block-top">
                  <b>
                    {room.roomObjectId.participantList[0]?.userObjectId
                      .nickName || room.roomName}
                  </b>
                  <span>
                    {formatDate(
                      room.roomObjectId.lastMessageObjectId.createdAt,
                      'YYYY. MM. DD.',
                    )}
                  </span>
                </p>
                <p className="preview">
                  {room.roomObjectId?.lastMessageObjectId?.message || ''}
                  {notReadMessageCount > 0 ? (
                    <Notification>{notReadMessageCount}</Notification>
                  ) : null}
                </p>
              </li>
            );
          })}
      </Styled.Contents>
    </Styled.Main>
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

export default ChatMainContent;
