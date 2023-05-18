interface LoginData {
  userId: string;
  password: string;
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
