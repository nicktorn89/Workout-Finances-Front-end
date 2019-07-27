// production config
const merge = require('webpack-merge');
const {resolve} = require('path');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'index.min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
    chunkFilename: 'js/[contenthash].js'
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin(),
  ],
});
