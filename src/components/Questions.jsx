/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
import { connect } from 'react-redux';
import { setScore } from '../actions';

const FIXED_PONTUATION = 10;
const HARD_DIFFICULTY = 3;
const MEDIUM = 2;
const EASY = 1;

class Questions extends React.Component {
    state={
      counter: 30,
      question: 0,
      respostas: '',
      requests: [],
      disableAlternatives: false,
      questionAnswered: false,
      score: [],
    }

    timer = null

    componentDidMount() {
      this.setState({ requests: this.getRequests() }); // array de arrays um array para 5 arrays de alternativas ja sorteadas
      const ONE_SECOND = 1000; // set o intervalo de decremento
      this.timer = setInterval(
        () => this.setState((prevState) => ({ counter: prevState.counter - 1 })),
        ONE_SECOND,
      );
    }

    componentDidUpdate() {
      const TIME = 30000;
      return setTimeout(() => { // duracao do tempo das perguntas
        this.setState({ respostas: 'errou', disableAlternatives: true }); // o que sera feito quando o tempo acabar
        clearInterval(this.timer);
      }, TIME);
    }

    componentWillUnmount() {
      clearInterval(this.timer); // desmonta o componente
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
        const { question, requests } = this.state;
        const allRequests = requests[question];
        return allRequests;
      }

      handleClick = () => { // quando clicar no botão next
        const { question } = this.state;
        const NUMBER_QUESTIONS = 4;
        if (question === NUMBER_QUESTIONS) {
          this.setState({ question: 0, respostas: '' }); // verifica se chegou na ultima resposta e faz isso dai
        } else {
          this.setState({ question: question + 1, respostas: '' });
        }
      }

      checkAnswer = (answer) => { // click na alternativa
        const { requestTrivia, dispatch } = this.props;
        const { question, score, counter } = this.state;
        clearInterval(this.timer); // demonsta o time
        this.setState({ questionAnswered: true });
        if (requestTrivia[question].correct_answer === answer) { // verifica se é verdadeira
          this.setState({
            respostas: 'acertou',
            counter: '',
          });
          // faz os calculos da questao respondida se for certa. não é necessario fazer para a questao errada no momento
          if (requestTrivia[question].difficulty === 'hard') {
            const scoreCalculate = FIXED_PONTUATION + (counter * HARD_DIFFICULTY);
            this.setState({ score: [...score, scoreCalculate] },
              () => {
                const { score: globalScore } = this.state;
                dispatch(setScore(globalScore));
              });
          } else if (requestTrivia[question].difficulty === 'medium') {
            const scoreCalculate = FIXED_PONTUATION + (counter * MEDIUM);
            this.setState({ score: [...score, scoreCalculate] },
              () => {
                const { score: globalScore } = this.state;
                dispatch(setScore(globalScore));
              });
          } else if (requestTrivia[question].difficulty === 'easy') {
            const scoreCalculate = FIXED_PONTUATION + (counter * EASY);
            this.setState({ score: [...score, scoreCalculate] },
              () => {
                const { score: globalScore } = this.state;
                dispatch(setScore(globalScore));
              });
          }
        } else { // verifica se é falsa
          this.setState({
            respostas: 'errou',
            counter: 0,
          });
        }
      }

      // getScore = () => {

      // }

      validateAnswers = () => { // validacao de cada uma das alternativas dentro de um objeto
        const { question } = this.state;
        const { requestTrivia } = this.props;
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
        const { requestTrivia } = this.props;
        const { question, respostas,
          disableAlternatives, counter, questionAnswered } = this.state;
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
                    disabled={ disableAlternatives }
                  >
                    { answer }
                  </button>
                </div>
              ))
            }
            <p>{ counter }</p>
            <p>{respostas}</p>
            {/* <Counter />  */}
            {

              questionAnswered && (
                <button
                  type="button"
                  onClick={ this.handleClick }
                  disabled={ !respostas }
                  data-testid="btn-next"
                >
                  Next
                </button>
              )
            }
            {/* <p>{score}</p> */}
          </div>
        );
      }
}

Questions.propTypes = {
  requestTrivia: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Questions);
