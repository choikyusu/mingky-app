import styled from 'styled-components';
import { IconType } from 'react-icons/lib';
import stores from '../../../store/configureStore';
import { menuActions } from '../../../store/modules/actions/menu.action';
import { useDispatch } from 'react-redux';

function IconBody(props: { icon: IconType }) {
  const Icon = props.icon;
  return <Icon size={32} />;
}

export function EventCategoryIcon(props: {
  icon: IconType;
  title: string;
  category: Category;
}) {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        tabIndex={0}
        className="icon"
        role="button"
        onClick={() =>
          dispatch(menuActions.setCategory({ category: props.category }))
        }
        onKeyPress={() => {
          dispatch(menuActions.setCategory({ category: props.category }));
        }}
      >
        <IconBody icon={props.icon} />
        <div>{props.title}</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  padding-right: 25px;
  padding-left: 25px;
  .icon {
    padding: 5px;
  }
  .icon:hover {
    color: red;
    border-bottom: solid;
    border-color: red;
  }
`;
