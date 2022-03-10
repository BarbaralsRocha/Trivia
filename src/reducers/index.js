import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import requests from './requests';

const rootReducer = combineReducers({
  user,
  token,
  requests,
});

export default rootReducer;
