import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPicture } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setPicture(`https://www.gravatar.com/avatar/${this.getImageGravatar()}`));
  }

    getImageGravatar = () => {
      const { email } = this.props;
      return md5(email.toString());
    }

    render() {
      const { user, score } = this.props;
      console.log(score);
      return (
      // comentário para push parte 2
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${this.getImageGravatar()}` }
            alt="gravatar"
          />
          <p data-testid="header-player-name">{ user }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
      );
    }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  score: PropTypes.arrayOf(PropTypes.number).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  user: state.user.user,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
