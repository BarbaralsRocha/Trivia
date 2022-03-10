export const LOGIN = 'LOGIN';

export const setUserData = (user, email) => ({ type: LOGIN, user, email });

export const tokenAPI = (token) => ({ type: 'TOKEN', token });

export const login = (user, email) => (dispatch) => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => {
    //   console.log(data.token);
      localStorage.setItem('token', JSON.stringify(data.token));
      dispatch(setUserData(user, email));
      dispatch(tokenAPI(data.token));
    });
};
