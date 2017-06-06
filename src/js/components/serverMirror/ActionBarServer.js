import React from 'react';
import PropTypes from 'prop-types';

require('es6-promise').polyfill();
const axios = require('axios');
const apiRequestTemplates = require('../../data/api-request-templates');

class ActionBarServer extends React.Component {
  constructor() {
    super();
    this.state = { isLoadingAuthToken: false };
    this.templateItems = Object.keys(apiRequestTemplates).map((key, index) =>
      <option key={key} value={key}>{key}</option>
    );
  }

  changeTemplateHandler(event) {
    if(this.props.onTemplateChange) {
      this.props.onTemplateChange(event.target.value);
    }
  }

  runClickHandler() {
    if(this.props.onRunClick) {
      this.props.onRunClick();
    }
  }

  generateAuthTokenClickHandler() {
    this.setState({ isLoadingAuthToken: true });
    axios.post(`${baseUrl}/jwt-token`)
      .then((res) => {
        if(this.props.onInfoGenerate) {
          this.props.onInfoGenerate(res.data);
        }
        this.setState({ isLoadingAuthToken: false });
      });
  }

  render() {
    return (
      <div className="action-bar">
        <div className="sdk-version">
          <span>API Request Template</span>
          <select name="version" value={this.template} onChange={this.changeTemplateHandler.bind(this)}>
            {this.templateItems}
          </select>
        </div>
        <button className="btn" onClick={this.runClickHandler.bind(this)}>
          &#x25b7; Run
          <span
            style={{ display: this.props.options.isRunning ? 'inline-block' : 'none' }}
            className="glyphicon glyphicon-refresh spinning"
          />
        </button>
        <button className="btn" onClick={this.generateAuthTokenClickHandler.bind(this)}>
          Generate Auth Token
          <span
            style={{ display: this.state.isLoadingAuthToken ? 'inline-block' : 'none' }}
            className="glyphicon glyphicon-refresh spinning"
          />
        </button>
      </div>
    );
  }
}

ActionBarServer.propTypes = {
  template: PropTypes.string,
  options: PropTypes.object,
  onTemplateChange: PropTypes.func,
  onRunClick: PropTypes.func,
  onInfoGenerate: PropTypes.func
};

export default ActionBarServer;
