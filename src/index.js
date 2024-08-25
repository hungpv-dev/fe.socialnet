import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyles';
import Search from './pages/Client/Search';
import RouterCustom from './router';
import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<RouterCustom/>
</BrowserRouter>
  
);

reportWebVitals();
