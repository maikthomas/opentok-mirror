import React from 'react';
import AppDispatcher from '../../AppDispatcher';
const axios = require('axios');
const apiRequestTemplates = require('../../data/api-request-templates');

class ActionBarServer extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingSessionInfo: false,
      running: false,
    };
    const self = this;
    AppDispatcher.register((payload) => {
      if (payload.actionType === 'SM_RUN') {
        self.setState({ running: true });
      }
      if (payload.actionType === 'SM_RUN_COMPLETE') {
        self.setState({ running: false });
      }
    });
    this.templateItems = Object.keys(apiRequestTemplates).map((key, index) => <option key={key} value={key}>{key}</option>);
  }

  changeTemplateHandler(event) {
    AppDispatcher.dispatch({
      actionType: 'SM_CHANGE_TEMPLATE',
      data: event.target.value,
    });
  }

  runClickHandler() {
    AppDispatcher.dispatch({
      actionType: 'SM_RUN',
    });
  }

  fillAuthClickHandler() {
    this.setState({ loadingSessionInfo: true });
    axios.post(`${baseUrl}/jwt-token`)
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: 'SM_GENERATE_INFO',
          data: res.data,
        });
        this.setState({ loadingSessionInfo: false });
      });
  }

  render() {
    return (
      <div className="action-bar">
        <div className="sdk-version">
          <span>API Request Template</span>
          <select name="version" onChange={this.changeTemplateHandler.bind(this)}>
            {this.templateItems}
          </select>
        </div>
        <button className="btn" onClick={this.runClickHandler.bind(this)}>
          &#x25b7; Run
          <span
            style={{ display: this.state.running ? 'inline-block' : 'none' }}
            className="glyphicon glyphicon-refresh spinning"
          />
        </button>
        <button className="btn" onClick={this.fillAuthClickHandler.bind(this)}>
          Generate Auth Token
          <span
            style={{ display: this.state.loadingSessionInfo ? 'inline-block' : 'none' }}
            className="glyphicon glyphicon-refresh spinning"
          />
        </button>
      </div>
    );
  }
}

export default ActionBarServer;
