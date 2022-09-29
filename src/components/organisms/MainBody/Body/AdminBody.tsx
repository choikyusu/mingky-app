import styled from 'styled-components';

export function AdminBody() {
  return (
    <Wrapper>
      <div className="icons">Admin</div>
    </Wrapper>
  );
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
