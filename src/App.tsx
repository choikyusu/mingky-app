import './App.css';
import { MainPage } from './pages/MainPage';

declare global {
  interface Window {
    naver: any;
  }
}

function App() {
  // const aaaa = useSelector((state: RootState) => state.todos.todoItems);

  // useEffect(() => {
  //   stores.dispatch(todoActions.create({ text: 'aaaa' }));
  // }, []);

  return <MainPage />;
}

export default App;
