import React from 'react';
import '../styles/styles.css';
import Summary from './Summary'
import WidgetForm from './WidgetForm'

class Widget extends React.Component {
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
      <div className='outer'>
        <form className='inner'
          style={this.state.width > 640 ? {
                border: '4px solid rgba(166,128,184,1)',
                padding: '60px'
              } : {}
          }>

            <div style={ this.state.width > 640 ? { margin: '50px 100px 150px 100px'} : {} }>
              {this.props.complete ? <Summary {...this.props}/> : <WidgetForm {...this.props}/>}
            </div>

        </form>
      </div>
    );
  }

}

export default Widget
