import { combineReducers } from 'redux';
import { todoReducer as todos } from './reducer/todos.reducer';

export interface StoreState {
    todos: TodosStateType;
}

export default combineReducers<StoreState>({
    todos
});