const parse = require('url').parse;

const _ = require('lodash');
const fetch = require('node-fetch');

const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');

const config = require('./config');
// const commands = require('./commands');
// const helpCommand = require('./commands/help');

// const semverUrl = require(`${process.cwd()}/package`).appConfig.semverUrl;
const bot = require('./bot');
const app = express();

if (config('PROXY_URI')) {

  app.use(proxy(config('PROXY_URI'), {

    forwardPath: (req, res) => parse(req.url).path
  }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default - hello world
app.get('/', (req, res) => { res.send('\n 👋 🌍 \n'); });

// Default command
app.post('/commands/node-version', (req, res) => {

  const payload = req.body;

  if (!payload || payload.token !== config('NODE_VERSION_COMMAND_TOKEN')) {

    const err = 'ERROR: An invalid slash token was received.';

    console.log(err);
    return res.status(401).end(err);
  }

  fetch(config('SEMVER_URL'))
    .then(res => {

      return res.json();
    })
    .then(nodeVersions => {

      const output = `Latest Node.js Versions
- Stable: v${nodeVersions.stable}
- Unstable: v${nodeVersions.unstable}\n`;

      console.log(output);
      res.end(output);
    }
  );

  // const cmd = _.reduce(commands, (a, command) => {
  //
  //   const val = payload.text.match(command.pattern) ? command : a;
  //   return val;
  // }, helpCommand);
  //
  // cmd.handler(payload, res);
});

// Bot is operational
app.listen(config('PORT'), (err) => {

  if (err) throw err;

  console.log(`\n🚀Node Version is running on ${config('PORT')} 🚀`);

  if (config('SLACK_TOKEN')) {

    console.log(`@node-version is real-time\n`);
    bot.listen({ token: config('SLACK_TOKEN') });
  }
});
