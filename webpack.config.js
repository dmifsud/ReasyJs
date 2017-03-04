var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/example',
  entry: {
      app: './app.module.ts'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },

  devServer: {
    port: 5000,
    contentBase: __dirname + '/build'
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
            loader: 'ts-loader',
            exclude: [/\.(spec|e2e)\.ts$/]
          }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      body: 'ReasyTs',
      entry: 'app/index.ejs', // Load a custom template (ejs by default but can be changed)
      fileName: 'index.html',
      template: 'index.ejs',
      hash: true
    })
  ]
};