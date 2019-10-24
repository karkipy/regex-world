const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function pwd(...paths) {
  const res = path.resolve(process.cwd(), ...paths);
  return res;
}

module.exports = {
  entry: ['regenerator-runtime/runtime', path.resolve(process.cwd(), 'app/src', 'index.js')],
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/flow'],
          },
        },
      },
      {
        test: [/\.scss$/, /\.css$/],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: pwd('app/pub', 'index.html'),
    }),
    new webpack.DefinePlugin({
      // eslint-disable-next-line
      __DEV__: process.env.NODE_ENV != 'production',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};