import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { NaverLogin } from './components/molecules/NaverLogin/NaverLogin';
import { MainPage } from './pages/MainPage';

declare global {
  interface Window {
    naver: any;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/naver_login" element={<NaverLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
