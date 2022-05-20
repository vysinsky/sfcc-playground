#!/usr/bin/env node
const arg = process.argv[2];

if (arg === '-v' || arg === '--version') {
  const { version } = require('../package.json');

  process.stdout.write(version + '\n');
  return;
}

require('../server/src/app').run();
