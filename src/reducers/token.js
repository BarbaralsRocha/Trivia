const initialState = '';

function token(state = initialState, action) {
  switch (action.type) {
  case 'TOKEN':
    return action.token;
  default:
    return state;
  }
}

export default token;
