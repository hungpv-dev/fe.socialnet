import { combineReducers } from 'redux';
import userReducer from './user';
import roomsReducer from './rooms';
import userOnlineReducer from './user_online';


export default combineReducers({
  user: userReducer,
  rooms: roomsReducer,
  user_online: userOnlineReducer,
});