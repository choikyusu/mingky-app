interface LoginData {
  userId: string;
  password: string;
}

interface SignupData {
  userId: string;
  password: string;
  name: string;
}

interface SignupRequestDto {
  user_id: string;
  password: string;
  name: string;
}

interface LoginResponseDto {
  token: string;
  refreshToken: string;
}

interface SignupResponseDto {
  user_id: string;
}
