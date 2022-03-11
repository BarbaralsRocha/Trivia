import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import requests from './requests';
import score from './score';

const rootReducer = combineReducers({
  user,
  token,
  requests,
  score,
});

export default rootReducer;
