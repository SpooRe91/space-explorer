import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { Provider } from 'react-redux';
import { store } from "./App/store";
import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
    {/* </BrowserRouter> */}
  </React.StrictMode>
)
