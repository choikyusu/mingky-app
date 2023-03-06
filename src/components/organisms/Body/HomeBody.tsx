import styled from 'styled-components';
import { categoryList } from '../../../constants/category.constant';
import { useState } from 'react';
import { CalendarCard } from '../../atoms/CalendarCard/CalendarCard';

export function HomeBody(props: { events: EventItem[] }) {
  const { events } = props;
  const [selectedItems, setSelectedItems] = useState<Category[]>([
    ...categoryList.list.map(category => category.id),
  ]);

  const colorList = [
    '#db2828',
    '#ff851b',
    '#fbbd08',
    '#b5cc18',
    '#21ba45',
    '#00b5ad',
    '#6435c9',
    '#a333c8',
    '#e03997',
  ];

  return (
    <Wrapper>
      <div>
        <div className="icons">
          {categoryList.list
            .filter(category => !category.hidden)
            .map((category, index) => (
              <Button
                selected={selectedItems.indexOf(category.id) > -1}
                color={colorList[index]}
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

const Button = styled.div<{ selected: boolean; color: string }>`
  font-weight: 700;
  box-shadow: 0 0 0 2px ${props => props.color} inset !important;
  color: ${props => `${props.selected ? '#ffffff' : props.color}`};
  ${props => `${props.selected && `background-color: ${props.color}`}`};
  text-shadow: none;
  margin: 0 5px 0 0;
  padding: 8px 16px 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 0 2px ${props => props.color} inset !important;
    color: ${props => `${props.selected ? '#000' : '#ffffff'}`};
    background-color: ${props => props.color};
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
