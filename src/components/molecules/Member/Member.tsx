import styled from 'styled-components';
import { BottomMenu } from './MemberMenu/BottomMenu';
import { TopMenu } from './MemberMenu/TopMenu';

export function Member() {
  return (
    <MemberWrapper>
      <TopMenu />
      <BottomMenu />
    </MemberWrapper>
  );
}

const MemberWrapper = styled.div`
  display: block;
`;
