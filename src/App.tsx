import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './store/configureStore';
import { todoActions } from './store/modules/actions/todos.action';

function App() {

  const aaaa = store.getState().todos.todoItems;

  useEffect((
  )=>{store.dispatch(todoActions.create({text: 'aaaa'}))}, [])

  return (
    <div className="App">
      {aaaa.map(item => item.text)}
    </div>
  );
}

export default App;
