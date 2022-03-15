const initialState = [];

function ranking(state = initialState, action) {
  switch (action.type) {
  case 'RANKING':
    return [state.ranking, action.ranking];
  default:
    return state;
  }
}

export default ranking;
