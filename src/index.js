import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './CartComp';
import Routing from './routing';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing  />
    {/* <App /> */}
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
