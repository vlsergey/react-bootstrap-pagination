/* eslint-env node */
const path = require( 'path' );

module.exports = function( config ) {
  config.set( {
    browsers: [ 'jsdom' ],
    frameworks: [ 'mocha' ],

    plugins: [
      'karma-chrome-launcher',
      'karma-jsdom-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    files: [
      'test/globals.js',
      'test/**/*Test.js',
    ],

    preprocessors: {
      'src/**/*.js': [ 'webpack', 'sourcemap' ],
      'test/**/*.js': [ 'webpack', 'sourcemap' ],
    },

    reporters: [
      'mocha',
    ],

    mochaReporter: {
      output: 'autowatch',
    },

    webpack: {
      mode: 'development',

      entry: './src/index.js',

      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },

      resolve: {
        modules: [
          path.resolve( __dirname, 'test' ),
          path.resolve( __dirname, 'src' ),
          'node_modules',
        ],
      },
    },
  } );
};
