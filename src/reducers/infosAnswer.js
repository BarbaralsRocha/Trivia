const initialState = {
  respostas: '',
  questionAnswered: false,
};

function infosAnswer(state = initialState, action) {
  switch (action.type) {
  case 'INFOS_ANSWER':
    return action.infos;
  default:
    return state;
  }
}

export default infosAnswer;
