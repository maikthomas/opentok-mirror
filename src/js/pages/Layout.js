import React from 'react';
import Nav from '../components/layout/Nav';
import { withRouter } from 'react-router';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Nav {...this.props} />
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Layout);
