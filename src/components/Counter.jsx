// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { counterTime, setTimeOut } from '../actions';

// class Counter extends React.Component {
//     state = {
//       counter: 30,
//     }

//     timer = null

//     componentDidMount() {
//       const ONE_SECOND = 1000; // set o intervalo de decremento
//       this.timer = setInterval(
//         () => this.setState((prevState) => ({ counter: prevState.counter - 1 })),
//         ONE_SECOND,
//       );
//     }

//     componentDidUpdate() {
//       const TIME = 30000;
//       const { counter } = this.state;
//       return setTimeout(() => { // duracao do tempo das perguntas
//         // se  nenhum alternativa for assinalda, respostas = 'errou', desabilita alternativas
//         const { dispatch, infosAnswer } = this.props;
//         const disableAlternatives = true;
//         const infos = { respostas: 'errou', questionAnswered: false };
//         if (infosAnswer === '') {
//           dispatch(setTimeOut(disableAlternatives));
//           dispatch(infosAnswer(infos));
//         }
//         clearInterval(this.timer);
//       }, TIME);
//     }

//     componentWillUnmount() {
//       clearInterval(this.timer); // desmonta o componente
//     }

//     render() {
//       const { counter } = this.state;
//       const { dispatch, infosAnswer } = this.props;
//       dispatch(counterTime(counter));
//       return (
//         <p>{ infosAnswer ? '0' : counter}</p>
//       );
//     }
// }

// const mapStateToProps = (state) => ({
//   infosAnswer: state.infosAnswer.resposta,
// });

// Counter.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   infosAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// export default connect(mapStateToProps)(Counter);
