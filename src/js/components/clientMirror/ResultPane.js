import React from 'react';
import AppDispatcher from '../../AppDispatcher';

class ResultPane extends React.Component {
  constructor() {
    super();
    const self = this;
    AppDispatcher.register((payload) => {
      if (payload.actionType === 'CM_CHANGE_SDK') {
        if (self.body) {
          self.changeSdkHandler(payload.data);
        } else {
          self.sdkDefaultVersion = payload.data;
        }
      }
      if (payload.actionType === 'CM_RUN') {
        self.displayResult();
      }
    });
  }

  changeSdkHandler(version) {
    if (this.scriptOT) {
      this.body.removeChild(this.scriptOT);
    }
    this.scriptOT = document.createElement('script');
    this.scriptOT.setAttribute('src', `https://static.opentok.com/v${version}/js/opentok.js`);
    this.body.appendChild(this.scriptOT);
  }

  displayResult() {
    if (this.html) {
      this.body.removeChild(this.html);
    }
    if (this.style) {
      this.body.removeChild(this.style);
    }
    if (this.script) {
      this.body.removeChild(this.script);
    }

    this.html = document.createElement('div');
    this.style = document.createElement('style');
    this.script = document.createElement('script');

    this.html.innerHTML = this.props.html;
    this.style.innerHTML = this.props.css;
    this.script.innerHTML = this.props.javascript;

    this.body.appendChild(this.html);
    this.body.appendChild(this.style);
    this.body.appendChild(this.script);
  }

  componentDidMount() {
    this.iframe = document.getElementsByTagName('iframe')[0];
    this.body = this.iframe.contentDocument.getElementsByTagName('body')[0];
    this.changeSdkHandler(this.sdkDefaultVersion);
  }

  render() {
    return (
      <div className={this.props.className}>
        <iframe className="frame" />
        <span className="pane-name">
          {this.props.name}
        </span>
      </div>
    );
  }
}

export default ResultPane;
