import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import requests from './requests';
import player from './score';
import ranking from './ranking';
import picture from './picture';
import infosAnswer from './infosAnswer';

const allReducers = combineReducers({
  user,
  token,
  requests,
  player,
  ranking,
  picture,
  infosAnswer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
