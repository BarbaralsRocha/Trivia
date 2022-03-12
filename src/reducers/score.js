const initialState = 0;

function score(state = initialState, action) {
  switch (action.type) {
  case 'ADD_SCORE':
    console.log('action', action.score);
    return action.score + state;
  default:
    return state;
  }
}

export default score;
