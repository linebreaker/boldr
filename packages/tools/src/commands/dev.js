import logger from 'boldr-utils/lib/logger';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import createExpress from '../server/createExpress';
import { devMiddleware } from '../server/devMiddleware';
import buildWebpackDlls from '../plugins/buildWebpackDlls';

const DEV_PORT = process.env.DEV_PORT;

export async function startDevServer() {
  logger.start('Creating development server...');
  const server = createExpress({});
  await buildWebpackDlls();
  const multiCompiler = devMiddleware(server);

  let serverIsStarted = false;
  multiCompiler.plugin('invalid', () => {
    logger.task('Compiling...');
  });

  multiCompiler.plugin('done', stats => {
    const rawMessages = stats.toJson({});
    const messages = formatWebpackMessages(rawMessages);

    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    if (isSuccessful) {
      logger.end('Compiled successfully!');
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      logger.error('Failed to compile.\n');
      logger.log(messages.errors.join('\n\n'));
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      logger.warn('Compiled with warnings.\n');
      logger.log(messages.warnings.join('\n\n'));
    }

    if (!stats.hasErrors() && !serverIsStarted) {
      serverIsStarted = true;

      server.listen(DEV_PORT, () => {
        logger.end(`Dev rendering server running on port: ${DEV_PORT}`);
      });
    }
  });
}
