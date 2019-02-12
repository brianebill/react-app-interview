import React from 'react';

class WidgetForm extends React.Component {
  componentDidMount() {
    this.answer.focus();
  }

  render() {
    return (
      <div>
        <section
          style={{
              height: '100px',
              width: '100px',
              margin: 'auto',
              backgroundImage: `url(${this.props.image})`,
              backgroundSize: 'cover'
            }}
          />

          <div style={{ maxWidth: '497px' }}>
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
          </div>

        <section className='buttons'>
          <input
            className='btn-container next-btn btn'
            onClick={this.props.handleNext}
            value={ this.props.isLast ? 'Complete' : 'Next' }
            type='submit'
          />

          {this.props.previousExists ?
            <input
              className='btn-container back-btn btn'
              onClick={this.props.handlePrev}
              value='Back'
              type='submit'
            /> : ''
          }
        </section>
      </div>
    );
  }

}

export default WidgetForm
