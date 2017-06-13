const redis = require('redis');
const rand = require('random-key');
const bluebird = require('bluebird');
const _ = require('lodash');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();
const clientMirrorPrefix = 'clientmirror';
const serverMirrorPrefix = 'servermirror';


const getUniqueId = (prefix) => {
  id = rand.generate(8);
  return client.existsAsync(`${prefix}:${id}`)
    .then(res => res === 0 ? id : getUniqueId(prefix));
  }

module.exports = {
  getClientMirror: (id) => {
    const dataFields = ['sdk', 'javascript','html', 'css'];
    return client.hmgetAsync(`${clientMirrorPrefix}:${id}`, dataFields)
      .then((res) => _.zipObject(dataFields, res));
  },

  setClientMirror: (data) => {
    let id;
    return getUniqueId(clientMirrorPrefix).then(uniqueId => {
      id = uniqueId;
      return client.hmsetAsync(`${clientMirrorPrefix}:${id}`,
        'sdk', data.sdk,
        'javascript', data.javascript,
        'css', data.css,
        'html', data.html).then((err, res) => id);
      });
  }
}
