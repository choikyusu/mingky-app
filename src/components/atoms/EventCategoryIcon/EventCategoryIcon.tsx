import styled from 'styled-components';
import { IconType } from 'react-icons/lib';

function IconBody(props: { icon: IconType }) {
  const Icon = props.icon;
  return <Icon size={32} />;
}

export function EventCategoryIcon(props: { icon: IconType; title: string }) {
  return (
    <Wrapper>
      <div className="icon">
        <IconBody icon={props.icon} />
        <div>{props.title}</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  margin-right: 25px;
  margin-left: 25px;
  .icon {
    padding: 5px;
  }
  .icon:hover {
    color: red;
    border-bottom: solid;
    border-color: red;
  }
`;
