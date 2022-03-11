const initialState = [];

function score(state = initialState, action) {
  switch (action.type) {
  case 'SCORE':
    console.log('action', action.score);
    return [...action.score];
  default:
    return state;
  }
}

export default score;
