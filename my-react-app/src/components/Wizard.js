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
    this.handleClick = this.handleClick.bind(this)
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
      //allow replacing of answers
      let answers;
      if (this.state.answers[this.state.current]) { //check to see if current answer exists
        answers = this.state.answers; // make copy to eliminate potential side effects
        answers.splice(this.state.current, 1, this.state.answer) // copy new, delete old
      } else { //no previous answer for this index exists
        answers = this.state.answers.concat(this.state.answer)
      }
      //check to see if user is circling back from summary
      let complete;
      cards.length === this.state.answers.length ? complete = true : complete = false;
      this.setState((state,props) => ({
        answers: answers,
        answer: '',
        complete: complete
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
        current: this.state.current - 1,
        answer: ''
      };
    });
  }

  handleClick(e) {
    //console.log(e.target.id)
    let index = e.target.id;
    this.setState(function(state, props) {
      return {
        complete: false,
        current: index
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.complete ?
            <Summary
              answers={this.state.answers}
              handleClick={e => this.handleClick(e)}
            />
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
