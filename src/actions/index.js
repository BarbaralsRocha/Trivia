export const LOGIN = 'LOGIN';

export const setUserData = (user, email) => ({ type: LOGIN, user, email });

export const tokenAPI = (token) => ({ type: 'TOKEN', token });

export const getRequests = (requests) => ({ type: 'REQUESTS', requests });

export const setScore = (score) => ({ type: 'ADD_SCORE', score });

export const rankingPlayer = (ranking, score) => ({ type: 'RANKING', ranking, score });

export const setPicture = (picture) => ({ type: 'PICTURE', picture });

export const infosAnswer = (infos) => ({ type: 'INFOS_ANSWER', infos });

export const resetState = () => ({ type: 'RESET' });

const setRankingPlayers = (scorePlayer) => {
  const players = JSON.parse(localStorage.getItem('ranking')) || [];
  if (!localStorage.getItem('ranking')) {
    return localStorage.setItem('ranking', JSON.stringify([scorePlayer]));
  }
  const playerIndex = players.findIndex((item) => item.picture === scorePlayer.picture);
  const SAME_PLAYER = -1;
  if (playerIndex !== SAME_PLAYER) {
    players[playerIndex].score = scorePlayer.score;
    return localStorage.setItem('ranking', JSON.stringify(players));
  }
  return localStorage.setItem('ranking', JSON.stringify([...players, scorePlayer]));
};

export const getRankingLocal = (score, user, picture) => (dispatch) => {
  const scorePlayer = {
    name: user,
    score: score.reduce((acc, valor) => acc + valor, 0),
    picture,
  };
  setRankingPlayers(scorePlayer);
  dispatch(setScore(score));
  dispatch(rankingPlayer(scorePlayer, score));
};

export const login = (user, email) => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem('token', data.token);
    dispatch(setUserData(user, email));
    dispatch(tokenAPI(data.token));
  });

export const getRequestsTrivia = () => async (dispatch) => {
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
