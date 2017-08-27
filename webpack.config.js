const webpack = require('webpack');

const path = require('path');
const camelCase = require('camelcase');

const pkg = require('./package.json');

const config = {
  // path.join(...) strips out the leading '.', which webpack requires.
  // FIXME: this *might* break building on non-POSIX environments (e.g. Windows)
  entry: `./${pkg.module}`,
  output: {
    filename: path.basename(pkg.main),
    path: path.resolve(__dirname, path.dirname(pkg.main)),
    library: camelCase(path.basename(pkg.main, '.js'))
  },
  externals: [
    'jquery',
    'bootstrap',
    'popper.js'
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
  plugins: [
    new webpack.ProvidePlugin({
      // required for bootstrap
      jQuery: 'jquery',
      Popper: 'popper.js'
    })
  ]
};

module.exports = (env) => {
  // source: https://stackoverflow.com/a/36728755/1142167
  const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'));
  if (isDevServer) {
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    config.plugins.push(
      new HtmlWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin()
    );

    // need dependencies to be present in dev server mode
    config.externals.splice(0);
  } else if (env && env.production) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    );
  }

  return config;
};
