import React from 'react';
import CustomCodeMirror from '../components/custom/CustomCodeMirror';
import ActionBar from '../components/clientMirror/ActionBar';
import ResultPane from '../components/clientMirror/ResultPane';
import AppDispatcher from '../AppDispatcher';
const initialState = require('../data/client-mirror-initial-state');

class ClientMirror extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    const self = this;
    AppDispatcher.register((payload) => {
      if (payload.actionType === 'CM_GENERATE_INFO') {
        self.generateInfo(payload.data);
      }
    });
  }

  updateHTML(newCode) {
    this.setState({ html: newCode });
  }

  updateJS(newCode) {
    this.setState({ javascript: newCode });
  }

  updateCSS(newCode) {
    this.setState({ css: newCode });
  }

  generateInfo(info) {
    this.setState({
      javascript:
        `${`var apiKey = ${info.apiKey};\n` +
        `var sessionId = "${info.sessionId}";\n` +
        `var token = "${info.token}";\n\n`}${
        this.state.javascript}`,
    });
  }

  render() {
    return (
      <div>
        <ActionBar />
        <div className="pane-window">
          <div className="container-code-mirror">
            <CustomCodeMirror
              name="HTML"
              value={this.state.html}
              options={{
                lineNumbers: true,
                mode: 'htmlembedded',
                lineWrapping: true }}
              onChange={this.updateHTML.bind(this)}
            />
            <CustomCodeMirror
              name="JavaScript"
              value={this.state.javascript}
              options={{
                lineNumbers: true,
                mode: 'javascript',
                lineWrapping: true }}
              onChange={this.updateJS.bind(this)}
            />
          </div>
          <div className="container-code-mirror">
            <CustomCodeMirror
              name="CSS"
              value={this.state.css}
              options={{
                lineNumbers: true,
                mode: 'css',
                lineWrapping: true }}
              onChange={this.updateCSS.bind(this)}
            />
            <ResultPane
              className="result-pane"
              name="Result"
              html={this.state.html}
              javascript={this.state.javascript}
              css={this.state.css}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ClientMirror;
