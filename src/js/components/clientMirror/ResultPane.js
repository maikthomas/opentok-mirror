import React from 'react';
import PropTypes from 'prop-types';

class ResultPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sdkValue: props.sdkValue,
      result: props.result
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sdkValue !== this.state.sdkValue) {
      this.setState({ sdkValue: nextProps.sdkValue }, this.changeSdkHandler);
    }
    if (nextProps.result !== this.state.result) {
      this.setState({ result: nextProps.result }, this.displayResult);
    }
  }

  frameLoadHandler() {
    this.head = this.frame.contentDocument.head;
    this.changeSdkHandler();
  }

  changeSdkHandler() {
    const scriptOT = document.createElement('script');
    scriptOT.setAttribute('src',
      `https://static.opentok.com/v${this.state.sdkValue}/js/opentok.min.js`
    );
    this.head.innerHTML = '';
    this.head.appendChild(scriptOT);
  }

  displayResult() {
    if(this.body) {
      this.body.removeChild(this.html);
      this.body.removeChild(this.style);
      this.body.removeChild(this.script);
    } else {
      this.body = this.frame.contentDocument.body;
    }
    this.html = document.createElement('div');
    this.html.innerHTML = this.state.result.html;

    this.style = document.createElement('style');
    this.style.innerHTML = this.state.result.css;
    
    this.script = document.createElement('script');
    this.script.innerHTML = this.state.result.javascript;
    
    this.body.appendChild(this.html);
    this.body.appendChild(this.style);
    this.body.appendChild(this.script);
  }

  render() {
    return (
      <div className={this.props.className}>
        <iframe
          src={`${baseUrl}/html/frame.html`}
          className="frame"
          ref={(el) => (this.frame = el)}
          onLoad={this.frameLoadHandler.bind(this)}
        />
        <span className="pane-name">
          {this.props.name}
        </span>
      </div>
    );
  }
}

ResultPane.propTypes = {
  sdkValue: PropTypes.string,
  result: PropTypes.object
};

export default ResultPane;
