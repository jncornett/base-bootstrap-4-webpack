const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'lofiBootstrapForWebpack'
  },
  externals: [
    'bootstrap',
    // TODO: figure out path to SCSS entry point for bootstrap
    // 'bootstrap/path/to/scss/entry',
    'font-awesome-webpack'
  ]
};
