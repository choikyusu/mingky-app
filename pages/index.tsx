import React from 'react';
import { ToastContainer } from 'react-toastify';
import { HomeBody } from '../src/components/organisms/Body/HomeBody';
import { MainHeader } from '../src/components/organisms/MainHeader/MainHeader';
import ModalContainer from '../src/components/organisms/ModalContainer/ModalContainer';
import { API } from '../src/constants/api.constant';
import useFetch from '../src/hooks/useFetch';
import 'react-toastify/dist/ReactToastify.css';

export default function Home(props: { events: EventItem[] }) {
  const { events } = props;

  events.forEach(event => {
    event.startDate = new Date(event.startDate);
    event.endDate = new Date(event.endDate);
  });

  return (
    <>
      <MainHeader />
      <HomeBody events={events} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
      />
      <ModalContainer />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const newFetch = useFetch();

  const resultData: { events: EventItem[] } = await newFetch.callApi({
    url: `${process.env.SERVICE_URL}:${process.env.PORT}${API.GET_EVENTS_LIST}`,
    method: 'get',
  });

  return {
    props: { events: resultData.events },
  };
}
