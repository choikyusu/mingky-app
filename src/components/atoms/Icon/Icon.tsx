import styled from 'styled-components';

function IconBody(props: { icon: string }) {
  return <i className={`fa-solid fa-2x ${props.icon}`} />;
}

export function Icon(props: { icon: string }) {
  return (
    <Wrapper>
      <div className="icon">
        <IconBody icon={props.icon} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  margin-right: 50px;
  .icon {
    padding: 5px;
  }
  .icon:hover {
    color: red;
    border-bottom: solid;
    border-color: red;
  }
`;
