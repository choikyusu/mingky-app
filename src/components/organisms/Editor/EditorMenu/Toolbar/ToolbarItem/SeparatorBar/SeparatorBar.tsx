import styled from 'styled-components';

export const SeparatorBar = () => {
  return (
    <SeparatorBarWrapper>
      <div className="separator-bar" />
    </SeparatorBarWrapper>
  );
};

const SeparatorBarWrapper = styled.li`
  padding-left: 7px;
  padding-right: 14px;

  .separator-bar {
    &:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 15px;
      background-color: #e5e5e5;
    }
  }
`;
