import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Nav extends React.Component {
  render() {
    const { location } = this.props;
    const clientMirrorClass = location.pathname === '/' ? 'active' : '';
    const serverMirrorClass = location.pathname.match(/^\/server-mirror/) ? 'active' : '';

    return (
      <ul className="nav nav-tabs">
        <li className={clientMirrorClass}>
          <Link to="/">Client Mirror (OpenTok JS SDK)</Link>
        </li>
        <li className={serverMirrorClass}>
          <Link to="/server-mirror">Server Mirror (OpenTok API)</Link>
        </li>
      </ul>
    );
  }
}

Nav.propTypes = {
  location: PropTypes.object
};

export default Nav;
