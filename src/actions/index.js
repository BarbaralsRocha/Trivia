export const LOGIN = 'LOGIN';

export const setUserData = (user, email) => ({ type: LOGIN, user, email });

export const tokenAPI = (token) => ({ type: 'TOKEN', token });

export const getRequests = (requests) => ({ type: 'REQUESTS', requests });

// export const setScore = (score) => ({ type: 'ADD_SCORE', score });

export const rankingPlayer = (ranking, score) => ({ type: 'RANKING', ranking, score });

export const setPicture = (picture) => ({ type: 'PICTURE', picture });

export const getRankingLocal = (score, user, picture) => (dispatch) => {
  const scorePlayer = [{
    name: user,
    score: score.reduce((acc, valor) => acc + valor, 0),
    picture,
  }];
  localStorage.setItem('ranking', JSON.stringify(scorePlayer));
  dispatch(rankingPlayer(scorePlayer, score));
};

export const login = (user, email) => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem('token', data.token);
    dispatch(setUserData(user, email));
    dispatch(tokenAPI(data.token));
  });

export const getRequestsTrivia = () => (dispatch) => {
  const getTokenLocal = localStorage.getItem('token');
  return fetch(`https://opentdb.com/api.php?amount=5&token=${getTokenLocal}`)
    .then((response) => response.json())
    .then((data) => {
      const NEW_TOKEN = 3;
      if (data.response_code === NEW_TOKEN) {
        throw new Error('Refaça o Login');
      }
      dispatch(getRequests(data));
    });
};
