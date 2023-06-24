// webpack.config.js
module.exports = {  
  module: {
    rules: [
      {
        test: require.resolve('./js/Classes/Cells/Cell.js'),
        use: 'exports-loader?constructor'
      }
    ]
  }
};