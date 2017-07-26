import meow from 'meow';
import Promise from 'bluebird';
import logger from 'boldr-utils/lib/logger';
import appRoot from 'boldr-utils/lib/node/appRoot';
import pkg from '../package.json';
import { buildClient, buildServer, cleanClient, cleanServer } from './commands/build';
import { startDevServer } from './commands/dev';
import { startRenderServer } from './commands/ssr';

// Parse arguments
const command = meow(
  `
  Usage:
    $ btools <command>

  Options:
    --verbose, -v   Generate verbose output messages.
    --quiet, -q     Reduce amount of output messages to warnings and errors.

  Commands:
    dev             Start development server
    build           Build production appliction
    build:client    Build client part of production appliction
    build:server    Build server part of production appliction
    start:ssr       Start production render server
    clean           Clean up all generated files

`,
  {
    alias: {
      v: 'verbose',
      q: 'quiet',
    },
  },
);

const appPkg = require(`${appRoot.get()}/package.json`);
const appInfo = ` running on ${appPkg.name}-${appPkg.version}`;

const selectedTasks = command.input;
const flags = command.flags;

logger.info(`BOLDR ${`v${pkg.version}`}`) + appInfo;

// List of tasks we have available
const availableTasks = [
  { task: 'clean', commands: [cleanClient, cleanServer] },
  { task: 'build', commands: [cleanClient, cleanServer, buildClient, buildServer] },
  { task: 'build:server', commands: [cleanServer, buildServer] },
  { task: 'dev', commands: [cleanClient, cleanServer, startDevServer] },
  {
    task: 'start:ssr',
    commands: [cleanClient, cleanServer, buildClient, buildServer, startRenderServer],
  },
  { task: 'start:ssr:default', commands: [startRenderServer] },
];

// Prevent deprecation messages which should not be displayed to the end user
if (!flags.verbose) {
  process.noDeprecation = true;
}

/* eslint-disable no-process-exit */

function executeCommands(listOfCommands) {
  return Promise.each(listOfCommands, item => item());
}

async function executeTasks() {
  for (const taskName of selectedTasks) {
    for (const taskConfig of availableTasks) {
      if (taskConfig.task === taskName) {
        try {
          await executeCommands(taskConfig.commands);
        } catch (error) {
          logger.error(`Failed to execute task: ${taskName}`);
          logger.log(error);
          process.exit(1);
        }
      }
    }
  }
}

process.nextTick(executeTasks);
