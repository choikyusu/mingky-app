import styled from 'styled-components';
import { BottomMenu } from './MemberMenu/BottomMenu';
import { TopMenu } from './MemberMenu/TopMenu';

export function Member(props: { user: UserInfoType }) {
  const { user } = props;
  return (
    <MemberWrapper>
      <TopMenu user={user} />
      <BottomMenu />
    </MemberWrapper>
  );
}

const MemberWrapper = styled.div`
  display: block;
`;
