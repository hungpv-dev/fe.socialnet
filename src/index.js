import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyles';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import echo from './components/EchoComponent';
import { setUserOnline } from './actions/user';
const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </BrowserRouter>
  </Provider>
);

echo.join('user-online')
  .here((users) => {
    store.dispatch(setUserOnline(users));
  })
  .joining(async (user) => {
    const currentUsers = store.getState().user_online;
    const updatedUsers = currentUsers.filter(currentUser => currentUser.id !== user.id);
    store.dispatch(setUserOnline([...updatedUsers, user]));
  })
  .leaving((user) => {
    const currentUsers = store.getState().user_online;
    const updatedUsers = currentUsers.filter(currentUser => currentUser.id !== user.id);
    store.dispatch(setUserOnline(updatedUsers));
  })
  .listen('UserStatusUpdated', (e) => {
    console.log('Trạng thái người dùng được cập nhật:', e);
  });
reportWebVitals();
