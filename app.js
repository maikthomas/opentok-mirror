const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const OpenTok = require('opentok');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const rand = require("random-key");

const app = express();
const apiKey = process.env.API_KEY || 100;
const secret = process.env.API_SECRET || '19f149fdf697474f915f13de40e0ad53';
const opentok = new OpenTok(apiKey, secret);
const port = process.env.PORT || 8080;
const baseUrl = process.env.baseUrl || `http://localhost:${port}`;

app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.get('/', (req, res) => {
  res.render('index', {
    baseUrl,
  });
});

app.get('/client-mirror/:mirrorId', (req, res) => {
  /*
  TODO: RETRIEVE DATA HERE
   */
  res.send(JSON.stringify({
    javascript: 'var props = {width: \'100%\', height: \'100%\'};\nOT.initPublisher(\'publisher\', props);',
    html: '<div id="publisher"></div>\n<div id="subscriber"></div>',
    css: 'body {\n  margin: 0px;\n}',
    sdk: '2.11'
  }));
});

app.post('/client-mirror', (req, res) => {
    //TODO: Ensure ID is unique
    let mirrorId;
    mirrorId = rand.generate(8);
    //TODO: Save fields in redis
    console.log(req.body.sdk, req.body.javascript, req.body.css, req.body.html)

    res.send(mirrorId);
});

app.post('/session', (req, res) => {
  opentok.createSession((err, session) => {
    if (err) {
      res.send(err);
    }
    const token = opentok.generateToken(session.sessionId);
    res.send(JSON.stringify({
      apiKey,
      sessionId: session.sessionId,
      token,
    }));
  });
});

app.post('/jwt-token', (req, res) => {
  const currentTime = Math.floor(new Date() / 1000);
  const token = jwt.sign({
    iss: apiKey,
    ist: 'project',
    iat: Math.floor(new Date() / 1000),
    exp: currentTime + (60 * 60) // 1 hour
  }, secret);
  res.send(JSON.stringify({
    apiKey,
    token,
  }));
});

app.post('/sendAnvilRequest', (req, res) => {
  const jsonObj = JSON.parse(req.body.jsonObj);
  if (!jsonObj.headers['Content-Type']) {
    jsonObj.headers['Content-Type'] = 'application/x-www-form-urlencoded;';
  }
  axios(jsonObj).then((response) => {
    res.send(response.data);
  }).catch((error) => {
    res.send(error.response.data ||
      (error.response.status && error.response.statusText ?
      `${error.response.status} - ${error.response.statusText}` : 'Request error')
    );
  });
});

app.listen(port);
