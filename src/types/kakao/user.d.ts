interface UserResponseDto {
  code: number;
  userId: string;
  name: string;
  nickName: string;
  message: string;
  baseUrl: string;
  backgroundUrl: string;
}

interface UserInfo {
  userId: string;
  name: string;
  nickName: string;
  message: string;
  baseUrl: string;
  backgroundUrl: string;
}

interface ProfileRequestDto {
  nick_name: string;
  message: string;
  base_url: string;
  background_url: string;
}

type ChangePopupType = 'NickName' | 'Message' | '';
