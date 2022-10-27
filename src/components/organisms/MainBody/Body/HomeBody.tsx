import styled from 'styled-components';
import { EventCategoryIcon } from '../../../atoms/EventCategoryIcon/EventCategoryIcon';

import { GrInfo, GrLike } from 'react-icons/gr';
import { FaPiggyBank } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import stores, { RootState } from '../../../../store/configureStore';
import { useSelector } from 'react-redux';
import { CardList } from '../../../molecules/CardList/CardList';
import { useEffect } from 'react';
import axios from 'axios';
import { eventActions } from '../../../../store/modules/actions/event.action';
import useFetch from '../../../../hooks/useFetch';
import { API } from '../../../../constants/api.constant';

export function HomeBody() {
  const selectedCategory: Category = useSelector(
    (state: RootState) => state.menu.selectedCategory,
  );
  const { data } = useFetch<{ events: EventItem[] }>(API.GET_EVENTS_LIST);

  useEffect(() => {
    if (data) {
      const { events } = data;

      events.forEach(event => {
        event.startDate = new Date(event.startDate);
        event.endDate = new Date(event.endDate);
      });

      stores.dispatch(eventActions.setEventItem({ eventList: events }));
    }
  }, [data]);

  return (
    <Wrapper>
      <div>
        <div className="icons">
          <EventCategoryIcon
            icon={GiReceiveMoney}
            title="절약"
            category="SAVE"
          />
          <EventCategoryIcon
            icon={FaPiggyBank}
            title="부수입"
            category="INCOME"
          />
          <EventCategoryIcon icon={GrLike} title="추첨" category="RAFFLE" />
          <EventCategoryIcon icon={GrInfo} title="꿀팁" category="TIP" />
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
