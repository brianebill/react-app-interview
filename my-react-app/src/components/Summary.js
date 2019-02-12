import React, { Component } from 'react';
import '../styles/styles.css';
import cards from '../data/cards';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {

    return (
      <div className="outer">
        <div
          className="inner"
          style={this.state.width > 640 ? {
                border: '4px solid rgba(166,128,184,1)',
                padding: '60px'
              } : {}
          }
        >
          <div style={{ minHeight: '100px'}}>
            <img src='https://s3-us-west-2.amazonaws.com/beb-ui/tenor.gif' alt='funny dancing celebration' />
          </div>
          <ol style={{ listStyle: 'none' }}>
            {this.props.answers.map((a,i) => (
              <li key={a}>
                <span style={{ color: 'rgba(100,100,100,1)' }}>{cards[i].question}</span>: <strong>{a}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )

  }
}

export default Summary
