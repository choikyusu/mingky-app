import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { NaverLogin } from './components/molecules/NaverLogin/NaverLogin';
import ModalContainer from './components/organisms/ModalContainer/ModalContainer';
import { MainPage } from './pages/MainPage';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    naver: any;
  }
}

function App() {
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
