import { todoAction } from '../actions/todos.action';

const initialState: TodosStateType = {
  todoItems: [],
  input: '',
};

export function todoReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case todoAction.CREATE:
      return {
        input: '',
        todoItems: [...state.todoItems, action.payload],
      };

    default:
      return state;
  }
}
