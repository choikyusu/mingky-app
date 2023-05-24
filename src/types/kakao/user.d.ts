interface UserResponseDto {
  code: number;
  userId: string;
  name: string;
  nickName: string;
  message: string;
  profileUrl: string;
  backgroundUrl: string;
}

interface UserInfo {
  userId: string;
  name: string;
  nickName: string;
  message: string;
  profileUrl: string;
  backgroundUrl: string;
}

interface ProfileRequestDto {
  nickName: string;
  message: string;
  profileUrl: string;
  backgroundUrl: string;
}

type ChangePopupType = 'NickName' | 'Message' | '';
