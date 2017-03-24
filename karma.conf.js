// Karma configuration
// Generated on Fri Mar 24 2017 11:36:43 GMT+0100 (CET)
var webpack = require('webpack');
var karmaWebpack = require("karma-webpack");
var karmaJasmine = require('karma-jasmine');
// var karmaCoverage = require('karma-coverage');
var karmaChromeLauncher = require('karma-chrome-launcher');
var webpackConfig = require('./webpack.config.js');
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'tests/test-main.ts',
      {pattern: 'tests/*.spec.ts', included: true}
    ],

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      watch: true,
    },

    webpackServer: {
      noInfo: true,
    },

    webpackMiddleware: {
      noInfo: true
    },

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    // list of files to exclude
    exclude: [
    ],

    plugins: [
      karmaWebpack,
      karmaJasmine,
      // karmaBabel,
      // karmaCoverage,
      karmaChromeLauncher//,
      // karmaSourcemapLoader
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // Run this through webpack, and enable inline sourcemaps
      'tests/test-main.ts': ['webpack'],
      'tests/*.spec.ts': ['webpack'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}