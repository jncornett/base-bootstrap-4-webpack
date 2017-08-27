const path = require('path');

const config = {
  entry: {
    index: ['bootstrap', './src/index.js'],
  },
  output: {
    filename: 'lofi-bootstrap-for-webpack.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'lofiBootstrapForWebpack'
  },
  externals: [
    'bootstrap',
    // TODO: figure out path to SCSS entry point for bootstrap
    // 'bootstrap/path/to/scss/entry'
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: []
};

module.exports = (env) => {
  const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'));
  if (isDevServer) {
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    config.plugins.push(
      new HtmlWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin()
    );
    config.externals.splice(0);
  }

  return config;
};
