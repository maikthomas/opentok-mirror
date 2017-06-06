import React from 'react';
import CustomCodeMirror from '../components/custom/CustomCodeMirror';
import ActionBarServer from '../components/serverMirror/ActionBarServer';
import AppDispatcher from '../AppDispatcher';

const axios = require('axios');
const apiRequestTemplates = require('../data/api-request-templates');

class ServerMirror extends React.Component {
  constructor() {
    super();
    this.state = {
      json: this.getJsonByTemplate(Object.keys(apiRequestTemplates)[0]),
      result: '',
    };
    const self = this;
    AppDispatcher.register((payload) => {
      if (payload.actionType === 'SM_CHANGE_TEMPLATE') {
        self.setState({
          json: self.getJsonByTemplate(payload.data),
          result: '',
        });
      }
      if (payload.actionType === 'SM_GENERATE_INFO') {
        self.generateInfo(payload.data);
      }
      if (payload.actionType === 'SM_RUN') {
        self.run();
      }
    });
  }

  getJsonByTemplate(template) {
    return JSON.stringify(apiRequestTemplates[template], null, 4);
  }

  updateJSON(newCode) {
    this.setState({ json: newCode });
  }

  generateInfo(info) {
    this.setState({
      json: this.state.json
        .replace('<API_KEY>', info.apiKey)
        .replace('<JWT_TOKEN>', info.token),
    });
  }

  run() {
    const self = this;
    axios({
      method: 'POST',
      url: `${baseUrl}/sendAnvilRequest`,
      data: { jsonObj: this.state.json },
    }).then((res) => {
      self.setState({ result: JSON.stringify(res.data, null, 4) });
      AppDispatcher.dispatch({
        actionType: 'SM_RUN_COMPLETE',
      });
    });
  }

  render() {
    return (
      <div>
        <ActionBarServer />
        <div className="pane-window">
          <div className="container-code-mirror container-code-mirror-server">
            <CustomCodeMirror
              name="JSON"
              value={this.state.json}
              options={{
                lineNumbers: true,
                mode: 'javascript',
                lineWrapping: true }}
              onChange={this.updateJSON.bind(this)}
            />
          </div>
          <div className="container-code-mirror container-code-mirror-server">
            <CustomCodeMirror
              name="Result"
              value={this.state.result}
              options={{
                lineNumbers: true,
                readOnly: true,
                mode: 'xml',
                lineWrapping: true }}
              onChange={this.updateJSON.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ServerMirror;
