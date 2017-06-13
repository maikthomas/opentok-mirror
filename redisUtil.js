const redis = require('redis');
const rand = require('random-key');
const bluebird = require('bluebird');
const _ = require('lodash');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();
const clientMirrorPrefix = 'clientmirror';
const serverMirrorPrefix = 'servermirror';


const getUniqueId= () => {
  return rand.generate(8);
}

module.exports = {
  getClientMirror: (id) => {
    const dataFields = ['sdk', 'javascript','html', 'css'];
    return client.hmgetAsync(`${clientMirrorPrefix}:${id}`, dataFields)
      .then((res) => _.zipObject(dataFields, res));
  },

  setClientMirror: (data) => {
    const id = getUniqueId();
    return client.hmsetAsync(`${clientMirrorPrefix}:${id}`,
      'sdk', data.sdk,
      'javascript', data.javascript,
      'css', data.css,
      'html', data.html).then((err, res) => id);
  }
}
