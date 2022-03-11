const initialState = '';

function picture(state = initialState, action) {
  switch (action.type) {
  case 'PICTURE':
    console.log('picture');
    return action.picture;
  default:
    return state;
  }
}

export default picture;
