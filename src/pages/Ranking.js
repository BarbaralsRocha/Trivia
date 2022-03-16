import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetState } from '../actions';

class Ranking extends React.Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetState());
  }

  getRanking = () => {
    const players = JSON.parse(localStorage.getItem('ranking'));
    const sortPlay = [...players];
    const sortPlayers = sortPlay.sort((a, b) => b.score - a.score);
    return sortPlayers;
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          this.getRanking().map(({ name, score, picture }, index) => (
            <div key={ index }>
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>
                Pontuação:
                {' '}
                {score}
              </p>
              <img src={ picture } alt="game-player" />
            </div>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Voltar para o início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect()(Ranking);
