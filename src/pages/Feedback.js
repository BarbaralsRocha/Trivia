import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetState } from '../actions';

class Feedback extends React.Component {
  checkScore = () => {
    const { pontuacao } = this.props;
    const NUMBER_QUESTIONS = 3;
    if (pontuacao < NUMBER_QUESTIONS) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  handleClickBackToGame = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetState());
  }

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { pontuacao, score } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ this.checkScore() }</h1>
        <p data-testid="feedback-total-score">
          { score }
        </p>
        <p data-testid="feedback-total-question">
          { pontuacao }
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickBackToGame }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pontuacao: state.player.assertions,
  score: state.player.score,
  requestsAPI: state.requests,
});

Feedback.propTypes = {
  pontuacao: PropTypes.arrayOf(PropTypes.number).isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Feedback);
