import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Navbar from './Navbar';
import Form from './Form';
import Alert from './Alert';
import Advice from './Advice';
import { AppProvider } from './App';

ReactDOM.render(
  <>
  <Advice/>
  <React.StrictMode>
    <AppProvider>
      <Navbar />
      <Form />
      <Alert/>
    </AppProvider>,
  </React.StrictMode>
  </>
  ,
  document.getElementById('root')
);
