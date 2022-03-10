import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRequestsTrivia, login } from '../actions';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  componentDidMount() {
    const { dispatch, user, email } = this.props;
    dispatch(getRequestsTrivia()).catch(async () => {
      await dispatch(login(user, email));
      dispatch(getRequestsTrivia());
    });
  }

  render() {
    const { requestTrivia } = this.props;
    console.log('requestTrivia game', requestTrivia);
    return (
      <div>
        <Header />
        {
          requestTrivia && <Questions requestTrivia={ requestTrivia } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestTrivia: state.requests.results,
  tokenExpireValidation: state.requests.response_code,
  email: state.user.email,
  user: state.user.user,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  requestTrivia: PropTypes.arrayOf(PropTypes.object).isRequired,
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
