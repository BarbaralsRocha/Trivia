import React from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
import { connect } from 'react-redux';

class Questions extends React.Component {
    state={
      question: 0,
      respostas: '',
      requests: [],
    }

    componentDidMount() {
      this.setState({ requests: this.getRequests() });
    }

    getRequests = () => {
      const { requestTrivia } = this.props;
      const newRequest = [...requestTrivia];

      const answer = newRequest.map((quests) => {
        const questions = [...quests.incorrect_answers, quests.correct_answer];
        return questions;
      });

      console.log(this.props);
      return answer.map((quest) => this.getShuffledArr(quest));
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

      getAlternatives = () => {
        const { question, requests } = this.state;
        const allRequests = requests[question];
        return allRequests;
      }

      handleClick = () => {
        const { question } = this.state;
        console.log('questionNumber', question);
        const NUMBER_QUESTIONS = 4;
        if (question === NUMBER_QUESTIONS) {
          this.setState({ question: 0, respostas: '' });
        } else {
          this.setState({ question: question + 1, respostas: '' });
        }
      }

      checkAnswer = (answer) => {
        const { requestTrivia } = this.props;
        const { question } = this.state;
        if (requestTrivia[question].correct_answer === answer) {
          this.setState({
            respostas: 'acertou',
          });
        } else {
          this.setState({
            respostas: 'errou',
          });
        }
      }

      validateAnswers = () => {
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
        const { question, respostas } = this.state;
        const alternatives = this.getAlternatives();

        return (
          <div>
            <p data-testid="question-category">{requestTrivia[question].category}</p>
            <p data-testid="question-text">{requestTrivia[question].question}</p>
            {
              alternatives && alternatives.map((answer, index) => (
                <div data-testid="answer-options" key={ index }>
                  <button
                    type="button"
                    data-testid={ this.validateAnswers()[index].type }
                    onClick={ () => this.checkAnswer(answer, index) }
                    className={ this.validateAnswers()[index].className }
                  >
                    { answer }
                  </button>
                </div>
              ))
            }
            <p>{respostas}</p>
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ !respostas }
            >
              Proxima
            </button>
          </div>
        );
      }
}

Questions.propTypes = {
  requestTrivia: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect()(Questions);
