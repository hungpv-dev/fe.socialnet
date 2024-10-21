import { combineReducers } from 'redux';
import userReducer from './user';
import roomsReducer from './rooms';

export default combineReducers({
  user: userReducer,
  rooms: roomsReducer,
});