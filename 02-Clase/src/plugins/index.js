const { getId } = require('./get-id.plugin');
const { getAge } = require('./get-age.plugin');
const { httpClientPlugin } = require('./http-clientplugin');

module.exports = {
    getId,
    getAge,
    httpClientPlugin,
}