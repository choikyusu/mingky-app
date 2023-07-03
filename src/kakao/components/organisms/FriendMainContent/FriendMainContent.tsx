import { useState } from 'react';
import styled from 'styled-components';
import { FindFriendWindow } from '../../modals/FindFriendWindow/FindFriendWindow';
import { BASE_IMG_URL } from '@/src/kakao/constants/env.constants';
import { FriendPanel } from '../FriendPanel/FriendPanel';

const useFriendMainContent = () => {
  const [search, setSearch] = useState('');
  const [isopenFindFriend, openFindFriend] = useState(false);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return {
    search,
    isopenFindFriend,
    openFindFriend,
    onSearchChange,
  };
};

interface FriendMainContentProps {
  profile?: UserInfo;
  onBlockDoubleClick?: (type: RoomType, userId: string) => void;
  onImageClick?: (type: RoomType, friendProfile: UserProfile) => void;
}

const FriendMainContent = ({
  profile,
  onBlockDoubleClick,
  onImageClick,
}: FriendMainContentProps) => {
  const { search, isopenFindFriend, openFindFriend, onSearchChange } =
    useFriendMainContent();

  if (!profile || !onBlockDoubleClick || !onImageClick) return null;
  return (
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
          onDoubleClick={() => onBlockDoubleClick('Individual', profile.userId)}
        >
          <img
            src={profile?.profileUrl || BASE_IMG_URL}
            alt="profile"
            onClick={() => onImageClick('Individual', profile)}
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
            onImageClick={onImageClick}
            onBlockDoubleClick={onBlockDoubleClick}
          />
        </ul>
      </Styled.Contents>
    </Styled.Main>
  );
};

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

export default FriendMainContent;
