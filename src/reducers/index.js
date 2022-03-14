import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import requests from './requests';
import player from './score';
import ranking from './ranking';
import picture from './picture';
import infosAnswer from './infosAnswer';

const rootReducer = combineReducers({
  user,
  token,
  requests,
  player,
  ranking,
  picture,
  infosAnswer,
});

export default rootReducer;
