import React from 'react';
import '../styles/styles.css';

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
        <form className='inner'
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
                    backgroundImage: `url(${this.props.image})`,
                    backgroundSize: 'cover'
                  }}
                />

              <label>
                <h2 className='question'>{this.props.question}</h2>
                <input
                  id='answer'
                  type='text'
                  placeholder={this.props.placeholder}
                  ref={(input) => { this.answer = input }}
                  value={this.props.answer}
                  onChange={this.props.handleChange}
                />
              </label>

              {this.props.error ? <p className='error'>{this.props.error}</p> : <p>&nbsp;</p>}

              <section className='buttons'>
                {this.props.previousExists ?
                  <input
                    className='btn-container back-btn btn'
                    onClick={this.props.handlePrev}
                    value='Back'
                    type='submit'
                  /> : ''
                }

                <input
                  className='btn-container next-btn btn'
                  onClick={this.props.handleNext}
                  value={ this.props.isLast ? 'Complete' : 'Next' }
                  type='submit'
                />

              </section>
            </div>

        </form>
      </div>
    );
  }

}

export default Widget
