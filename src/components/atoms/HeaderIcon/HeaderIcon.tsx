import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

function IconBody(props: { icon: IconType }) {
  const Icon = props.icon;
  return <Icon size={32} />;
}

export function HeaderIcon(props: { icon: IconType }) {
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
  .material-icons {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  }
`;
