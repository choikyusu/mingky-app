type UserInfoType = {
  accountType: AccountType;
  id: string;
  name: string;
  email: string;
  gender: string;
  age: string;
};

type AccountType = 'ANONYMOUS' | 'MEMBER';

type SettingInfoType = {
  push: boolean;
  topFix: boolean;
};
