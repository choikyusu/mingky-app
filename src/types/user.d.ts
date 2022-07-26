type UserInfoType = {
  accountType: AccountType;
  userName: string;
  email: string;
  gender: string;
  birthOfYear: string;
  phone: string;
};

type AccountType = 'ANONYMOUS' | 'MEMBER';
