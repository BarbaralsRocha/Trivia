/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
import { connect } from 'react-redux';
import { getRankingLocal, infosAnswer } from '../actions';

const FIXED_PONTUATION = 10;
const HARD_DIFFICULTY = 3;
const MEDIUM = 2;
const EASY = 1;

class Questions extends React.Component {
    state={
      // counter: 30,
      respostas: '',
      requests: [],
      questionAnswered: false,
      score: [],
    }

    timer = null

    componentDidMount() {
      this.setState({ requests: this.getRequests() }); // array de arrays um array para 5 arrays de alternativas ja sorteadas
    }

    getRequests = () => {
      const { requestTrivia } = this.props;
      const newRequest = [...requestTrivia];

      const answer = newRequest.map((quests) => {
        const questions = [...quests.incorrect_answers, quests.correct_answer]; // junta a resposta correta com a incorreta
        return questions;
      });
      return answer.map((quest) => this.getShuffledArr(quest)); // chama a função que sorteia
    }

      // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      getShuffledArr = (quest) => {
        const newArr = quest.slice();
        for (let i = newArr.length - 1; i > 0; i -= 1) {
          const rand = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
      };

      getAlternatives = () => { // pega as alternativas para cada questao
        const { requests } = this.state;
        const { question } = this.props;
        const allRequests = requests[question];
        return allRequests;
      }

      dispatchInfos = () => {
        const { respostas, questionAnswered } = this.state;
        const { dispatch } = this.props;
        dispatch(infosAnswer({
          respostas, questionAnswered,
        }));
      }

      checkAnswer = (answer) => { // click na alternativa
        const { question, requestTrivia, dispatch, user, picture, counter } = this.props;
        const { score } = this.state;
        clearInterval(this.timer); // demonsta o time
        if (requestTrivia[question].correct_answer === answer) { // verifica se é verdadeira
          this.setState({
            respostas: 'Resposta Correta!',
            questionAnswered: true,
          }, this.setInfosAboutQuestions);

          // faz os calculos da questao respondida se for certa. não é necessario fazer para a questao errada no momento
          if (requestTrivia[question].difficulty === 'hard') {
            const scoreCalculate = FIXED_PONTUATION + (counter * HARD_DIFFICULTY);
            this.setState({ score: [...score, scoreCalculate] },
              () => {
                const { score: globalScore } = this.state;
                dispatch(getRankingLocal(globalScore, user, picture));
              });
          } else if (requestTrivia[question].difficulty === 'medium') {
            const scoreCalculate = FIXED_PONTUATION + (counter * MEDIUM);
            this.setState({ score: [...score, scoreCalculate] },
              () => {
                const { score: globalScore } = this.state;
                dispatch(getRankingLocal(globalScore, user, picture));
              });
          } else if (requestTrivia[question].difficulty === 'easy') {
            const scoreCalculate = FIXED_PONTUATION + (counter * EASY);
            this.setState({ score: [...score, scoreCalculate] },
              () => {
                const { score: globalScore } = this.state;
                dispatch(getRankingLocal(globalScore, user, picture));
              });
          }
        } else { // verifica se é falsa
          this.setState({
            respostas: 'Resposta Incorreta! :(',
            questionAnswered: true,
          }, this.setInfosAboutQuestions);
        }
      }

      setInfosAboutQuestions = () => {
        const { dispatch } = this.props;
        const { respostas, questionAnswered } = this.state;
        dispatch(infosAnswer({
          respostas, questionAnswered,
        }));
      }

      validateAnswers = () => { // validacao de cada uma das alternativas dentro de um objeto
        const { requestTrivia, question } = this.props;
        const alternatives = this.getAlternatives();
        return alternatives.map((pergunta, index) => ({
          answer: pergunta,
          type: requestTrivia[question].correct_answer === pergunta
            ? 'correct-answer' : `wrong-answer-${index}`,
          className: requestTrivia[question].correct_answer === pergunta
            ? 'correct' : 'wrong',
        }));
      }

      render() {
        const { requestTrivia, question, disabledTime } = this.props;
        const alternatives = this.getAlternatives();
        return (
          <div>

            <p data-testid="question-category">{requestTrivia[question].category}</p>
            <p data-testid="question-text">{requestTrivia[question].question}</p>
            {
              alternatives && alternatives.map((answer, index) => ( // vai pegar as alternativas da questao;
                <div data-testid="answer-options" key={ index }>
                  <button
                    type="button"
                    data-testid={ this.validateAnswers()[index].type }
                    onClick={ () => this.checkAnswer(answer, index) }
                    className={ this.validateAnswers()[index].className }
                    disabled={ disabledTime }
                  >
                    { answer }
                  </button>
                </div>
              ))
            }
            {/* <p>{ counter }</p> */}
            {/* <Counter />  */}
          </div>
        );
      }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  picture: state.picture,
  disableAlternatives: state.time,
  score: state.player.score,
});

Questions.propTypes = {
  user: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  requestTrivia: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.number.isRequired,
  disabledTime: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Questions);
