const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ESLintPlugin()
  ]
};
