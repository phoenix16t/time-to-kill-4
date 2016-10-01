module.exports = {
  entry: './public/js/App.js',
  output: {
    path: __dirname + '/public/dist',
    filename: 'build.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      include: __dirname + '/public/js/'
    }]
  }
}
