var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var plugins = [];



module.exports = {
  context: __dirname + '/src',
  entry: {
      'reasy.min' : './index.ts'
  },
  output: {
    filename: '[name].js',
    library: 'reasy',
    libraryTarget: 'commonjs',
    path: __dirname + '/lib'
  },
  devtool: 'source-map',
  devServer: {
    port: 5000,
    contentBase: __dirname + '/lib'
  },

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  },
  module: {
    // preLoaders: [

    //   {
    //     test: /\.ts$/,
    //     loader: 'tslint',
    //     exclude: [/\.(node_modules|spec|e2e)\.ts$/]
    //   }

    // ],

    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          {
            test: /\.ts$/,
            loader: 'ts-loader'// ,
            // exclude: [/\.(spec|e2e)\.ts$/]
          }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false, drop_console: true },
      minimize: false,
      output: {comments: false},
      mangle: false,
      sourceMap: true,
      screwIe8: true
    })
  ]

  // plugins: [
  //   new HtmlWebpackPlugin({
  //     body: 'NgReasy',
  //     entry: 'app/index.ejs', // Load a custom template (ejs by default but can be changed)
  //     fileName: 'index.html',
  //     template: 'index.ejs',
  //     hash: true
  //   })
  // ]
};