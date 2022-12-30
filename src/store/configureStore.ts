import * as reducer from './modules';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

const reducers = combineReducers({ ...reducer });
const middlewares = applyMiddleware(ReduxThunk);

const configureStore = () => {
  return createStore(reducers, composeWithDevTools(middlewares));
};

export type RootState = ReturnType<typeof reducers>;

export const stores = createStore(reducers, composeWithDevTools(middlewares));
export default createWrapper(configureStore);
