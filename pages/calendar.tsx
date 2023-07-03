import { CalendarBody } from '@/src/components/organisms/Body/CalendarBody';
import { MainHeader } from '@/src/components/organisms/MainHeader/MainHeader';
import { API } from '@/src/constants/api.constant';
import useFetch from '@/src/hooks/useFetch';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Calendar(props: { events: EventItem[] }) {
  const { events } = props;
  return (
    <>
      <MainHeader />
      <CalendarBody events={events} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
      />
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
