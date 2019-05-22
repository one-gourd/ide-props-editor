const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { getExternal } = require('./webpack-helper');

const targetDir = 'dist';

const isDebug = process.env.DEBUG === 'true'

module.exports = common.map(config => {
  /* 这份配置是用于引入到浏览器中时候用的
     比如 https://unpkg.com/ide-props-editor@0.1.0/dist/index.umd.js
  */
  return merge(config, {
    entry: './src/index.tsx',
    externals: getExternal([], true),
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer: [new TerserPlugin()]
    },
    plugins: [
      new CleanWebpackPlugin(targetDir),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    output: {
      filename: 'index.umd.js',
      libraryTarget: 'umd',
      library: 'idePropsEditor',
      path: path.resolve(__dirname, 'dist'),
      umdNamedDefine: true
    }
  }, isDebug ? {
      mode: 'development',
      devtool: 'inline-source-map', optimization: {}, plugins: [
        new CleanWebpackPlugin(targetDir)
      ]} : {});
});
