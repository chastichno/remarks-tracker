import React from 'react';
import AppNavbar from './components/AppNavbar';
import TasksList from './components/TasksList';
import TaskModel from './components/TaskModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <TaskModel />
          <TasksList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
