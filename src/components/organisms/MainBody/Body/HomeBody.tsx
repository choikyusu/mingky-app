import styled from 'styled-components';
import { EventCategoryIcon } from '../../../atoms/EventCategoryIcon/EventCategoryIcon';

import stores, { RootState } from '../../../../store/configureStore';
import { useSelector } from 'react-redux';
import { CardList } from '../../../molecules/CardList/CardList';
import { useEffect } from 'react';
import { eventActions } from '../../../../store/modules/actions/event.action';
import useFetch from '../../../../hooks/useFetch';
import { API } from '../../../../constants/api.constant';
import { CATEGORY_LIST } from '../../../../constants/category.constant';

export function HomeBody() {
  const selectedCategory: Category = useSelector(
    (state: RootState) => state.menu.selectedCategory,
  );

  const newFetch = useFetch();

  useEffect(() => {
    (async () => {
      const resultData: { events: EventItem[] } = await newFetch.callApi({
        method: 'get',
        url: API.GET_EVENTS_LIST,
      });

      if (resultData) {
        const { events } = resultData;

        events.forEach(event => {
          event.startDate = new Date(event.startDate);
          event.endDate = new Date(event.endDate);
        });

        stores.dispatch(eventActions.setEventItem({ eventList: events }));
      }
    })();
  }, []);

  return (
    <Wrapper>
      <div>
        <div className="icons">
          {CATEGORY_LIST.filter(category => !category.hidden).map(category => (
            <EventCategoryIcon
              icon={category.icon}
              title={category.name}
              category={category.id}
            />
          ))}
        </div>
        <CardList category={selectedCategory} />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  .icons {
    display: flex;
    flex-wrap: wrap;
  }
`;
