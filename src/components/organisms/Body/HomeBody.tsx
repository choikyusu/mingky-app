import styled from 'styled-components';
import { categoryList } from '../../../constants/category.constant';
import { useState } from 'react';
import { CalendarCard } from '../../atoms/CalendarCard/CalendarCard';

export function HomeBody(props: { events: EventItem[] }) {
  const { events } = props;
  const [selectedItems, setSelectedItems] = useState<Category[]>([
    ...categoryList.list.map(category => category.id),
  ]);

  return (
    <Wrapper>
      <div>
        <div className="icons">
          {categoryList.list
            .filter(category => !category.hidden)
            .map(category => (
              <Button
                selected={selectedItems.indexOf(category.id) > -1}
                role="button"
                onClick={() => {
                  if (selectedItems.find(item => item === category.id)) {
                    setSelectedItems([
                      ...selectedItems.filter(item => item !== category.id),
                    ]);
                  } else {
                    setSelectedItems([...selectedItems, category.id]);
                  }
                }}
              >
                {category.name}
              </Button>
            ))}
        </div>
        {events
          .filter(event => selectedItems.indexOf(event.category) >= 0)
          .map(event => (
            <CalendarCard event={event} />
          ))}
      </div>
    </Wrapper>
  );
}

const Button = styled.div<{ selected: boolean }>`
  background-color: ${props => (props.selected ? '#1b1c1d' : '#e4e4e4')};
  color: ${props => (props.selected ? '#fff' : '#000')};
  text-shadow: none;
  margin: 0 5px 0 0;
  padding: 8px 16px 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  :hover {
    background-color: ${props => (props.selected ? '#27292a' : '#e0e0e0')};
    color: ${props => (props.selected ? '#fff' : '#000')};
    text-shadow: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  .icons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
