import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
    getImageGravatar = () => {
      const { email } = this.props;
      return md5(email.toString());
    }

    render() {
      const { user } = this.props;

      return (
      // comentário para push AAAAA
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${this.getImageGravatar()}` }
            alt="gravatar"
          />
          <p data-testid="header-player-name">{ user }</p>
          <p data-testid="header-score">0</p>
        </header>
      );
    }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  user: state.user.user,
});
export default connect(mapStateToProps)(Header);
