
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
var webpack = require('webpack');

var APP_PATH = path.resolve(__dirname, '../src/static/');
var PUBLIC_PATH = '/public/';

module.exports = {
  context: APP_PATH,
  watch: true,
  entry: {
    app: './app/js/main',
  },
  output: {
    filename: 'entry/[name].js',
    chunkFilename: 'chunk/[name]-[chunkhash:6].js',
    publicPath: PUBLIC_PATH
  },
  module: {
    loaders: [
      {
        test: /.vue$/,
        loader: 'vue'
      },
      {
        test: /\.less$/,
        loader: 'less!css'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif|jpeg|otf|eot|svg|ttf|woff|woff2)(\?\S+)?$/,
        loader: 'file?name=asset/[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.styl$/,
        loader: 'style!css!stylus'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['app'],
      template: '../view/index.html',
      filename: '../../page/index.html'
    })
  ],
  devtool: '#inline-source-map'

}
