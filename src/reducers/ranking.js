const initialState = [];

function ranking(state = initialState, action) {
  switch (action.type) {
  case 'RANKING':
    return action.ranking;
  default:
    return state;
  }
}

export default ranking;
