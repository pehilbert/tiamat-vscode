const path = require('path');

module.exports = {
  entry: './src/chat_app/index.js', // React app entry point
  output: {
    path: path.resolve(__dirname, 'out/chat_app'), // Adjusted output path
    filename: 'index.js', // The bundled JS file to load in the webview
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  devtool: 'source-map'
};
