import React from 'react';
import PropTypes from 'prop-types';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';

require('es6-promise').polyfill();
const axios = require('axios');
const jsSdkVersions = require('../../data/js-sdk-versions');

class ActionBar extends React.Component {
  constructor() {
    super();
    this.state = { isLoadingSessionInfo: false };
    this.jsSdkVersionItems = jsSdkVersions.map(item =>
      <option key={item.value} value={item.value}>{item.label}</option>
    );
  }

  changeSdkHandler(event) {
    if(this.props.onSdkChange) {
      this.props.onSdkChange(event.target.value);
    }
  }

  runClickHandler() {
    if(this.props.onRunClick) {
      this.props.onRunClick();
    }
  }

  generateSessionInfoClickHandler() {
    this.setState({ isLoadingSessionInfo: true });
    axios.post(`${baseUrl}/session`)
      .then((res) => {
        if(this.props.onInfoGenerate) {
          this.props.onInfoGenerate(res.data);
        }
        this.setState({ isLoadingSessionInfo: false });
      });
  }

  render() {
    return (
      <div className="action-bar">
        <div className="sdk-version">
          <span>JS SDK Version</span>
          <select name="version" value={this.props.sdk} onChange={this.changeSdkHandler.bind(this)}>
            {this.jsSdkVersionItems}
          </select>
        </div>
        <button className="btn" onClick={this.runClickHandler.bind(this)}>
          &#x25b7; Run
          <span
            style={{ display: this.props.options.isRunning ? 'inline-block' : 'none' }}
            className="glyphicon glyphicon-refresh spinning"
          />
        </button>
        <button className="btn" onClick={this.generateSessionInfoClickHandler.bind(this)}>
          Generate Session Info
          <span
            style={{ display: this.state.isLoadingSessionInfo ? 'inline-block' : 'none' }}
            className="glyphicon glyphicon-refresh spinning"
          />
        </button>
        <button className="btn" onClick={() => {this.props.onSaveClick()}}>
          <FaFloppyO /> Save
          <span
            style={{ display: this.props.options.isRunning ? 'inline-block' : 'none' }}
            className="glyphicon glyphicon-refresh spinning"
          />
        </button>
      </div>
    );
  }
}

ActionBar.propTypes = {
  sdk: PropTypes.string,
  options: PropTypes.object,
  onSdkChange: PropTypes.func,
  onRunClick: PropTypes.func,
  onInfoGenerate: PropTypes.func
};

export default ActionBar;
