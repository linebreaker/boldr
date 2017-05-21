/* eslint-disable */
const path = require('path');

module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    BOLDR__SERVER_PORT: process.env.BOLDR__SERVER_PORT,
    BOLDR__DEV_PORT: process.env.BOLDR__DEV_PORT,
  },
  bundle: {
    verbose: true,
    debug: false,
    cssModules: true,
    wpProfile: false,
    webPath: '/assets/',
    publicDir: path.resolve(__dirname, '../public'),
    assetsDir:  path.resolve(__dirname, '../public/assets'),
    srcDir: path.resolve(__dirname, '../src'),
    client: {
      entry: path.resolve(__dirname, '../src/client/index.js'),
      bundleDir: path.resolve(__dirname, '../public/assets'),
    },
    server: {
      entry: path.resolve(__dirname, '../src/server/index.js'),
      bundleDir: path.resolve(__dirname, '../lib'),
    },
    vendor: [
      'apollo-client',
      'axios',
      'boldr-ui',
      'boldr-utils',
      'classnames',
      'draft-js-import-html',
      'draft-js',
      'draftjs-to-html',
      'griddle-react',
      'material-ui',
      'normalizr',
      'prop-types',
      'react-apollo',
      'react-dom',
      'react-draft-wysiwyg',
      'react-dropzone',
      'react-helmet',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'react-tap-event-plugin',
      'react-transition-group',
      'react',
      'redux-form',
      'redux',
      'reselect',
      'serialize-javascript',
      'styled-components',
      'webfontloader',
    ],
  },
    server: {
      port: 3000,
      host: '127.0.0.1',
      apiPrefix: '/api/v1',
      siteUrl: 'http://localhost:3000',
    },
    logging: {
      level: 'debug',
      file: {
        enable: true,
        dir: 'logs',
        level: 'info',
        filename: 'boldr.api',
      },
    },
    db: {
      url: 'postgres://postgres:password@127.0.0.1:5432/boldr',
      name: 'boldr',
      debug: false,
    },
    redis: {
      url: 'redis://127.0.0.1:6379',
    },
    token: {
      iss: 'boldr',
      aud: '',
      algorithm: 'HS256',
      secret: 'b0ldrk3kwi11s15',
    },
    mail: {
      host: 'smtp.example',
      port: 465,
      ssl: true,
      user: 'hello@boldr.io',
      password: 'password',
      from: 'hello@boldr.io',
    },
    cors: {
      whitelist: ['http://localhost:2121', 'http://localhost:3000'],
    },

};
