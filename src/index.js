import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './Features/Store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <Routes>
          <Route path='/*' element={<App />} />

        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
