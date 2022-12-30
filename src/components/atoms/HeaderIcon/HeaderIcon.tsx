import { IconType } from 'react-icons/lib';
import styled from 'styled-components';
import Link from 'next/link';

function IconBody(props: { icon: IconType }) {
  const Icon = props.icon;
  return <Icon size={32} />;
}

export function HeaderIcon(props: { icon: IconType; link: string }) {
  return (
    <Wrapper>
      <Link href={props.link}>
        <div tabIndex={0} className="icon" role="button">
          <IconBody icon={props.icon} />
        </div>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  margin-right: 50px;
  box-sizing: border-box;
  width: 45px;
  height: 49px;
  .icon {
    padding: 5px;
  }
  .icon:hover {
    color: red;
    border-bottom: solid;
    border-color: red;
  }
`;
