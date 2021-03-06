module.exports = () => ({
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')({
      browsers: ['> 1%', 'last 2 versions'],
      flexbox: 'no-2009',
    }),
    require('postcss-discard-duplicates')(),
  ],
});
