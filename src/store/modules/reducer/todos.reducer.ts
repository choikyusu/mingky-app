import { todoAction } from "../actions/todos.action";

const initialState : TodosStateType = {
    todoItems: [],
    input: "" ,
  };

export function todoReducer(
    state = initialState,
    action: any
  ) {
    switch (action.type) {
      case todoAction.CREATE:
        return {
          input: "",
          todoItems: [...state.todoItems, action.payload]
        };
      case todoAction.REMOVE:
        return {
          ...state,
          todoItems: state.todoItems.filter(todo => todo.id !== action.meta.id)
        };
      case todoAction.TOGGLE:
        return {
          ...state,
          todoItems: state.todoItems.map(todo => {
            if (todo.id === action.meta.id) {
              todo.done = !todo.done;
            }
            return todo;
          })
        };
      case todoAction.CHANGE_INPUT:
        return {
          ...state,
          input: action.meta.input
        };
      default:
        return state;
    }
  }