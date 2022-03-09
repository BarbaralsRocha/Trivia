import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { login } from '../actions';

class Login extends React.Component {
    state = {
      email: '',
      user: '',
    };

    handleChange = ({ target: { value, name } }) => {
      this.setState({ [name]: value });
    }

    validateForms = () => {
      const { email, user } = this.state;
      let disabledButton = true;
      const regex = /\S+@\S+\.\S+/;
      const validateEmail = regex.test(email);
      if (user.length > 0 && validateEmail) {
        disabledButton = false;
        return disabledButton;
      }
      return disabledButton;
    }

    handleClick = async () => {
      const { user, email } = this.state;
      const { dispatch, history } = this.props;
      dispatch(login(user, email));
      // console.log(token);
      history.push('./game');
    }

    handleClickSettings = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    render() {
      const { email, user } = this.state;
      return (
        <div>
          <label htmlFor="input-user">
            User:
            <input
              onChange={ this.handleChange }
              type="user"
              name="user"
              value={ user }
              id="input-user"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-email">
            Email:
            <input
              onChange={ this.handleChange }
              type="email"
              name="email"
              value={ email }
              id="input-email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
            disabled={ this.validateForms() }
            data-testid="btn-play"
          >
            Play
          </button>
          <button
            type="button"
            onClick={ this.handleClickSettings }
            data-testid="btn-settings"
          >
            <FiSettings />
          </button>
        </div>);
    }
}

// const mapStateToProps = (state) => ({
//   // token: state.triviaRequest.token,
// });

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // token: PropTypes.string.isRequired,
};

export default connect()(Login);
