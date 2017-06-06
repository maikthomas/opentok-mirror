import React from 'react';
import AppDispatcher from '../../AppDispatcher';

const axios = require('axios');
const jsSdkVersions = require('../../data/js-sdk-versions');

class ActionBar extends React.Component {
  constructor() {
    super();
    this.state = { loadingSessionInfo: false };
    this.jsSdkVersionItems = jsSdkVersions.map(item =>
      <option key={item.value} value={item.value}>{item.label}</option>,
    );
  }

  componentDidMount() {
    this.changeSdkHandler();
  }

  changeSdkHandler(event) {
    const value = event ? event.target.value : jsSdkVersions[0].value;
    AppDispatcher.dispatch({
      actionType: 'CM_CHANGE_SDK',
      data: value,
    });
  }

  runClickHandler() {
    AppDispatcher.dispatch({
      actionType: 'CM_RUN',
    });
  }

  generateSessionInfoClickHandler() {
    this.setState({ loadingSessionInfo: true });
    axios.post(`${baseUrl}/session`)
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: 'CM_GENERATE_INFO',
          data: res.data,
        });
        this.setState({ loadingSessionInfo: false });
      });
  }

  render() {
    return (
      <div className="action-bar">
        <div className="sdk-version">
          <span>JS SDK Version</span>
          <select name="version" onChange={this.changeSdkHandler.bind(this)}>
            {this.jsSdkVersionItems}
          </select>
        </div>
        <button className="btn" onClick={this.runClickHandler.bind(this)}>
          &#x25b7; Run
        </button>
        <button className="btn" onClick={this.generateSessionInfoClickHandler.bind(this)}>
          Generate Session Info
          <span
            style={{ display: this.state.loadingSessionInfo ? 'inline-block' : 'none' }}
            className="glyphicon glyphicon-refresh spinning"
          />
        </button>
      </div>
    );
  }
}

export default ActionBar;
