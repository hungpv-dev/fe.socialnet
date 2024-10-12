import { combineReducers } from 'redux';
import { user } from './user';
import roomsReducer from './rooms';

export default combineReducers({
  user,
  rooms: roomsReducer,
});