
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
// const config= require('config')
const APP_PATH = path.resolve(__dirname, '../src/static/');
const PUBLIC_PATH = path.resolve(__dirname, '../dist/src/static/app/');
// console.log(process.env.NODE_ENV === 'production')
// const isDev = (process.env.NODE_ENV === 'production') ? false : true;

module.exports = {
  context: APP_PATH,
  watch: false,
  entry: {
    app: './app/js/main',
  },
  output: {
    filename: 'entry/[name].js',
    chunkFilename: 'chunk/[name]-[chunkhash:6].js',
    publicPath: '/static/'
    // publicPath: PUBLIC_PATH
  },
  module: {
   rules: [
      {
         test: /\.(png|jpg|gif|jpeg|otf|eot|svg|ttf|woff|woff2)$/,
         use: [
           'file-loader'
         ]
      },{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },{
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['app'],
      template: '../view/index.html',
      filename: '../../page/index.html'
    })
  ]

}
