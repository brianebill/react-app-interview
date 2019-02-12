import React from 'react';
import './Widget.css';

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.answer.focus();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    return (
      <div className='outer'>
        <div className='inner'
          style={this.state.width > 640 ? {
                border: '4px solid rgba(166,128,184,1)',
                padding: '60px'
              } : {}
          }>

            <div style={ this.state.width > 640 ? { margin: '50px 100px 150px 100px'} : {} }>
              <section
                style={{
                    height: '100px',
                    width: '100px',
                    margin: 'auto',
                    background: `url(${this.props.image})`,
                    backgroundSize: 'cover'
                  }}
                />

              <label>
                <h2 className='question'>{this.props.question}</h2>
                <input
                  className='answer'
                  type='text'
                  placeholder={this.props.placeholder}
                  ref={(input) => { this.answer = input }}
                />
              </label>

              <section className='buttons'>
                <button className='btn-container back-btn btn'>
                  { this.props.previousExists ? 'Back' : '' }
                </button>

                <button className='btn-container next-btn btn'>
                  { this.props.isLast ? 'Complete' : 'Next' }
                </button>
              </section>
            </div>

        </div>
      </div>
    );
  }

}

export default Widget
