const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: 'development',
  // 为了在报错的时候更好的追踪代码和给出错误代码出现的地方的提示，我们可以使用source map
  devtool: 'inline-source-map',
  entry: {
    app: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5',
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new friendlyErrorsWebpackPlugin(),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        }, 'postcss-loader'],
      },
      // TS
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
       },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    compress: true,
    port: 9000,
  },
}