const dotenv = require('dotenv');
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {

  dotenv.load();
}

const config = {

  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PROXY_URI: process.env.PROXY_URI,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  NODE_VERSION_COMMAND_TOKEN: process.env.NODE_VERSION_COMMAND_TOKEN,
  SLACK_TOKEN: process.env.SLACK_TOKEN,
  SEMVER_URL: process.env.SEMVER_URL,
  ICON_EMOJI: ':rocket:'
};

module.exports = (key) => { return (key) ? config[key] : config; };
