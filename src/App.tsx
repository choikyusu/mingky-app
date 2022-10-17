import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { NaverLogin } from './components/molecules/NaverLogin/NaverLogin';
import ModalContainer from './components/organisms/ModalContainer/ModalContainer';
import { MainPage } from './pages/MainPage';
import 'react-toastify/dist/ReactToastify.css';
import { eventActions } from './store/modules/actions/event.action';
import stores from './store/configureStore';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

function App() {
  // test data
  const insert = useRef<boolean>(false);
  useEffect(() => {
    if (insert.current) return;
    insert.current = true;

    stores.dispatch(
      eventActions.setEventItem({
        event: {
          id: '1',
          category: 'SAVE',
          name: 'test01',
          startDate: new Date('2022-10-14'),
          endDate: new Date('2022-10-15'),
          description: 'test01',
          status: '진행중',
          isUse: true,
        },
      }),
    );

    stores.dispatch(
      eventActions.setEventItem({
        event: {
          id: '2',
          category: 'SAVE',
          name: 'test02',
          startDate: new Date('2022-10-17'),
          endDate: new Date('2022-10-18'),
          description: 'test02',
          status: '완료',
          isUse: true,
        },
      }),
    );

    stores.dispatch(
      eventActions.setEventItem({
        event: {
          id: '3',
          category: 'INCOME',
          name: 'test03',
          startDate: new Date('2022-10-15'),
          endDate: new Date('2022-10-17'),
          description: 'test02',
          status: '완료',
          isUse: true,
        },
      }),
    );

    stores.dispatch(
      eventActions.setEventItem({
        event: {
          id: '4',
          category: 'INCOME',
          name: 'test04',
          startDate: new Date('2022-10-14'),
          endDate: new Date('2022-10-18'),
          description: 'test02',
          status: '완료',
          isUse: true,
        },
      }),
    );
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/naver_login" element={<NaverLogin />} />
        </Routes>
      </BrowserRouter>
      <ModalContainer />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
}

export default App;
