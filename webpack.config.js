const path = require('path')

module.exports = {
  entry: {
    'chartx': './src/chartx.js',
    'demo': './demo/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  }
}



// module.exports = {
//   entry: {
//     'todo': './src/app.js',
//   },
//   output: {
//     filename: '[name].js',
//     path: __dirname + '/dist/'
//   },
//   module: {
//     rules: [{
//       test: /\.js$/,
//       use: ['babel-loader'],
//       exclude: /node_modules/
//     }, {
//       test: /\.scss$/,
//       use: ['style-loader', 'css-loader', 'sass-loader']
//     }]
//   }
// }