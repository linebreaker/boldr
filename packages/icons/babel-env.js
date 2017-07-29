const babelenv = require('babel-preset-env');

const ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    [
      babelenv,
      {
        modules: ENV === 'modules' ? false : 'commonjs',
        loose: true,
        useBuiltIns: true,
      },
    ],
  ],
};
