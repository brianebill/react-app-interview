import React, { Component } from 'react';
import Widget from './Widget';
import cards from '../data/cards';

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 0 }
  }

  isLastQuestion() {
    return false
  }
  previousExists() {
    return true
  }
  handleNext() {
    return true
  }
  handlePrevious() {
    return true
  }

  render() {
    return (
      <div>
          <Widget
            question={cards[this.state.current].question}
            image={cards[this.state.current].image}
            placeholder={cards[this.state.current].placeholder}
            isLast={this.isLastQuestion()}
            previousExists={this.previousExists()}
            handleNext={this.handleNext()}
            handlePrevious={this.handlePrevious()}
          />
      </div>
    );
  }
}

export default Wizard;
