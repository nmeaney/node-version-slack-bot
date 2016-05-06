const _ = require('lodash');
const slack = require('slack');
const config = require('./config');

const bot = slack.rtm.client();

bot.started((payload) => { this.self = payload.self; });

bot.message((msg) => {

  if (!msg.user) return;

  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return;

  slack.chat.postMessage({

    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel: msg.channel,
    username: 'node-version',
    text: 'Node Version Slack Bot'
  },
  (err, data) => {

    if (err) throw err;

    console.log(`Responding with "${_.truncate(data.message.text)}"`);
  });
});

module.exports = bot;
