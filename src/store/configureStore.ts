import * as reducer from './modules';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

const reducers = combineReducers({ ...reducer });
const middlewares = applyMiddleware(ReduxThunk);

export default createStore(reducers, composeWithDevTools(middlewares));
export type RootState = ReturnType<typeof reducers>;
