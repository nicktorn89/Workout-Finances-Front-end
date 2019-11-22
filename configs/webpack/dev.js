// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    './index.tsx',
  ],
  devServer: {
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        secure: false,
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerPort: 9995
    })
  ],
});
