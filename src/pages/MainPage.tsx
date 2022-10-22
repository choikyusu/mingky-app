import { useSelector } from 'react-redux';
import { MainBody } from '../components/organisms/MainBody/MainBody';
import { MainHeader } from '../components/organisms/MainHeader/MainHeader';
import { RootState } from '../store/configureStore';
import { Editor } from './Editor';

export function MainPage() {
  const mode: ModeType = useSelector((state: RootState) => state.menu.mode);

  return (
    <div>
      {mode === 'NORMAL' ? (
        <div>
          <MainHeader />
          <MainBody />
        </div>
      ) : (
        <Editor />
      )}
    </div>
  );
}
