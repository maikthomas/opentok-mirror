import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect, Switch} from 'react-router-dom';
import Layout from './pages/Layout';
import ClientMirror from './pages/ClientMirror';
import ServerMirror from './pages/ServerMirror';

ReactDOM.render(
  <HashRouter>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="client-mirror" />
          <Route path="/client-mirror/:mirrorId?" component={ClientMirror} />
          <Route path="/server-mirror/:mirrorId?" component={ServerMirror} />
        </Switch>
      </Layout>
    </HashRouter>,
  document.getElementById('appContainer')
);
