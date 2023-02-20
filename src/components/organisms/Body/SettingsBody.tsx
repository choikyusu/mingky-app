import styled from 'styled-components';
import { NaverLogin } from '../../molecules/NaverLogin/NaverLogin';
import { Member } from '../../molecules/Member/Member';

export function SettingsBody(props: { user: UserInfoType }) {
  const { user } = props;

  switch (user?.accountType) {
    case 'MEMBER':
      return (
        <Wrapper>
          <Member user={user} />
        </Wrapper>
      );
    default:
      return (
        <Wrapper>
          <NaverLogin />
        </Wrapper>
      );
  }
}
const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  .icons {
    display: flex;
    flex-wrap: wrap;
  }
`;
