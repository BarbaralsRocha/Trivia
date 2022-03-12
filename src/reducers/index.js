import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import requests from './requests';
import score from './score';
import ranking from './ranking';
import picture from './picture';

const rootReducer = combineReducers({
  user,
  token,
  requests,
  score,
  ranking,
  picture,
});

export default rootReducer;
