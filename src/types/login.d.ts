type UserInfoType = {
  accountType: AccountType;
  id: string;
  name: string;
  email: string;
  gender: string;
  birthYear: string;
  mobile: string;
};

type AccountType = 'ANONYMOUS' | 'MEMBER';

type SettingInfoType = {
  push: boolean;
  topFix: boolean;
};
