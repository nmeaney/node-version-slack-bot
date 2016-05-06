const fetch = require('node-fetch');

const semverUrl = require('./package').appConfig.semverUrl;

fetch(semverUrl)

  .then(res => res.json())

  .then(nodeVersions => {

    console.log('stable:', nodeVersions.stable);
    console.log('unstable:', nodeVersions.unstable);
  })

  .catch(err => console.log('error:', err)
);

/*
(function* go() {

  console.log('hi');

  const res = yield fetch(semverUrl);
  const nodeVersions = yield res.json();

  console.log('stable:', nodeVersions.stable);
  console.log('unstable:', nodeVersions.unstable);
}());
*/
