const initialState = {
  score: 0,
  assertions: 0,
};

function player(state = initialState, action) {
  switch (action.type) {
  case 'ADD_SCORE':
    return {
      score: action.score.reduce((acc, valor) => acc + valor, 0),
      assertions: action.score.length,
    };
  default:
    return state;
  }
}

export default player;
