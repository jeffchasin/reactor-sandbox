var files = require('./constants/files');
var IgnorePlugin = require('webpack').IgnorePlugin;

module.exports = {
  entry: {
    viewSandbox: files.VIEW_SANDBOX_JS_PATH
  },
  // AJV needs json-loader.
  module: {
    loaders: [
      {
        'test': /\.json$/,
        'loader': 'json'
      }
    ]
  },
  node: {
    // We had an error similar with the one described here:
    // https://github.com/josephsavona/valuable/issues/9
    fs: 'empty'
  },
  output: {
    path: '/',
    filename: 'viewSandbox.js'
  },
  plugins: [
    // Fixing ajv async plugin warnings. More details here: https://github.com/epoberezkin/ajv/issues/117
    new IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/)
  ]
};
