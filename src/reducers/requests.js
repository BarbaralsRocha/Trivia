const initialState = {};

function requests(state = initialState, action) {
  switch (action.type) {
  case 'REQUESTS':
    return action.requests;
  default:
    return state;
  }
}

export default requests;
