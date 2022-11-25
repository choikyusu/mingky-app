import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store/configureStore';
import { EventCard } from '../../atoms/EventCard/EventCard';

export function CardList(props: { category: Category }) {
  const { category } = props;
  const eventList: { [id: string]: EventItem } = useSelector(
    (state: RootState) => state.event.eventList,
  );
  const [categoryItemList, setCategoryItemList] = useState<EventItem[]>([]);

  useEffect(() => {
    const list: EventItem[] = [];
    Object.values(eventList).forEach(event => {
      if (category === event.category) list.push(event);
    });

    setCategoryItemList(list);
  }, [category, eventList]);

  return (
    <Wrapper>
      <div className="body">
        {categoryItemList.map(event => {
          return <EventCard event={event} />;
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;

  .body {
    background: #f7f7f7;
    max-width: 450px;
    width: 100%;
    height: 80vh;
    overflow: auto;

    .card {
      width: 402px;
      min-height: 64px;
      display: flex;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #8c8a8a;
        margin-right: 10px;
      }
    }
  }

  hr {
    border: 1px solid #c8c8c8;
  }
`;
