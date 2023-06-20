import styled from 'styled-components';

interface MenuProps {
  popupProfile:
    | {
        type: ProfileWindowType;
        profile: UserProfile;
      }
    | undefined;
}

export const Menu = ({ popupProfile }: MenuProps) => {
  if (!popupProfile) return null;
  return (
    <Styled.Wrapper>
      <div>
        <i className="fas fa-comment" />
        <p>{popupProfile.type === 'Me' ? '나와의 채팅' : '1:1 채팅'}</p>
      </div>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.section`
    border-top: 1px solid #fff;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    padding: 30px 20px;
    & div {
      text-align: center;
      cursor: pointer;
      & i {
        color: #fff;
        font-size: 20px;
        margin-bottom: 5px;
      }
    }
  `,
};
