import React, { Component } from 'react';
import Widget from './Widget';
import Summary from './Summary';
import cards from '../data/cards';

let sortedCards = cards.slice(0);
sortedCards.sort(function(a,b) { return a.order - b.order });

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      complete: false,
      answer: '',
      answers: [],
      error: ''
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }

  handleChange(e) {
    this.setState({ answer: e.target.value });
  }

  handleNext(e) {
    e.preventDefault();
    if (this.state.answer.length === 0) {
      this.setState({ error: 'Please enter an answer above' })
      setTimeout(() => { this.setState({ error: '' })}, 2000)
      return
    } else {
      let answers;
      if (this.state.answers[this.state.current]) {
        answers = this.state.answers;
        answers.splice(this.state.current, 1, this.state.answer)
      } else {
        answers = this.state.answers.concat(this.state.answer)
      }
      this.setState((state,props) => ({
        answers: answers,
        answer: ''
      }))
    }
    if (cards.length - 1 === this.state.current) {
      this.setState(function(state, props) {
        return {
          complete: true
        };
      });
    } else {
      this.setState(function(state, props) {
        return {
          current: this.state.current + 1
        };
      });
    }
  }

  handlePrev(e) {
    e.preventDefault();
    this.setState(function(state, props) {
      return {
        current: this.state.current - 1
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.complete ?
            <Summary answers={this.state.answers} />
          : <Widget
            question={sortedCards[this.state.current].question}
            answer={this.state.answer}
            handleChange={ e => this.handleChange(e) }
            image={sortedCards[this.state.current].image}
            placeholder={sortedCards[this.state.current].placeholder}
            previousExists={this.state.current !== 0}
            handleNext={ e => this.handleNext(e) }
            handlePrev={ e => this.handlePrev(e) }
            error={this.state.error}
          />
        }


      </div>
    );
  }
}

export default Wizard;
