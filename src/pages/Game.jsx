import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRequestsTrivia, infosAnswer, login } from '../actions';
import Header from '../components/Header';
import Questions from '../components/Questions';
// import Counter from '../components/Counter';

class Game extends Component {
  state = {
    question: 0,
    counter: 30,
    disableAlternatives: false,
  }

  componentDidMount() {
    const { dispatch, user, email } = this.props;
    dispatch(getRequestsTrivia()).catch(async () => {
      await dispatch(login(user, email));
      dispatch(getRequestsTrivia());
    });
    this.counterTime();
  }

  counterTime = () => {
    const { dispatch } = this.props;
    const ONE_SECOND = 1000; // set o intervalo de decremento
    this.timer = setInterval(
      () => {
        const { counter } = this.state;
        if (counter === 0) {
          const respostas = 'Tempo esgotado';
          const questionAnswered = true;
          dispatch(infosAnswer({ respostas, questionAnswered }));
          this.setState({ disableAlternatives: true });
          clearInterval(this.timer);
        } else {
          this.setState((prevState) => ({ counter: prevState.counter - 1 }));
        }
      },
      ONE_SECOND,
    );
  }

  handleClick = () => { // quando clicar no botão next
    const { question } = this.state;
    const { history, infos } = this.props;
    this.setState({ counter: 30, disableAlternatives: false });
    clearInterval(this.timer);
    this.counterTime();
    const NUMBER_QUESTIONS = 4;
    if (question === NUMBER_QUESTIONS) {
      // this.setState({ question: 0 }); // verifica se chegou na ultima resposta e faz isso dai
      infos.respostas = '';
      history.push('/feedback');
    } else {
      this.setState({ question: question + 1 });
      infos.respostas = '';
    }
  }

  checkAnswer = () => {
    const { infos } = this.props;
    if (infos.respostas) clearInterval(this.timer);
  }

  render() {
    const { requestTrivia, infos } = this.props;
    const { question, counter, disableAlternatives } = this.state;
    return (
      <div>
        <Header />
        {
          requestTrivia && <Questions
            question={ question }
            counter={ counter }
            requestTrivia={ requestTrivia }
            disabledTime={ disableAlternatives }
          />
        }
        <p>{ infos.respostas }</p>
        <p>{ !infos.respostas ? counter : this.checkAnswer() }</p>
        {

          infos.questionAnswered && (
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ !infos.respostas }
              data-testid="btn-next"
            >
              Next
            </button>
          )
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
  infos: state.infosAnswer,
  score: state.player.score,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  requestTrivia: PropTypes.arrayOf(PropTypes.object).isRequired,
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  infos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Game);
