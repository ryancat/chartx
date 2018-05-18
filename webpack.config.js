const path = require('path'),
      webpack = require('webpack')

module.exports = [{
  entry: {
    'chartx': './src/chartx.js',
    'demo': './demo/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'code': JSON.stringify(process.NODE_ENV || 'DEV')
      }
    })
  ],

  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  }
}, {
  entry: {
    'data_reducer_xAxis': './src/dataReducers/xAxisReducer.js',
    'data_reducer_yAxis': './src/dataReducers/yAxisReducer.js',
    'data_reducer_chart': './src/dataReducers/chartReducer.js',
    'data_reducer_legend': './src/dataReducers/legendReducer.js',
    'data_reducer_detail': './src/dataReducers/detailReducer.js',

    'render_reducer_xAxis': './src/renderReducers/xAxisRenderReducer.js',
    'render_reducer_yAxis': './src/renderReducers/yAxisRenderReducer.js',
    'render_reducer_chart': './src/renderReducers/chartRenderReducer.js',
    'render_reducer_legend': './src/renderReducers/legendRenderReducer.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '[name]',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'code': JSON.stringify(process.NODE_ENV || 'DEV')
      }
    })
  ],

  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  }
}]



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