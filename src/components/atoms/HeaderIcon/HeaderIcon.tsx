import { IconType } from 'react-icons/lib';
import styled from 'styled-components';
import { menuActions } from '../../../store/modules/actions/menu.action';
import store from '../../../store/configureStore';
import { useDispatch } from 'react-redux';

function IconBody(props: { icon: IconType }) {
  const Icon = props.icon;
  return <Icon size={32} />;
}

export function HeaderIcon(props: { icon: IconType; menu: MenuType }) {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        tabIndex={0}
        className="icon"
        role="button"
        onClick={() => dispatch(menuActions.setMenu({ menu: props.menu }))}
        onKeyPress={() => {
          dispatch(menuActions.setMenu({ menu: props.menu }));
        }}
      >
        <IconBody icon={props.icon} />
      </div>
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
