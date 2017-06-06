import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'react-codemirror';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlembedded/htmlembedded');
require('codemirror/mode/xml/xml');

class CustomCodeMirror extends CodeMirror {
  componentDidMount() {
    super.componentDidMount();
    const $span = document.createElement('span');
    $span.className = 'pane-name';
    $span.innerHTML = this.props.name;
    ReactDOM.findDOMNode(this).getElementsByClassName('CodeMirror')[0].appendChild($span);
  }
}

export default CustomCodeMirror;
