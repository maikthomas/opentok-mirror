import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Layout from './pages/Layout';
import ClientMirror from './pages/ClientMirror';
import ServerMirror from './pages/ServerMirror';

ReactDOM.render(
  <HashRouter>
    <Layout>
      <Route exact path="/" component={ClientMirror} />
      <Route path="/server-mirror" component={ServerMirror} />
    </Layout>
  </HashRouter>,
document.getElementById('appContainer'));
