/* eslint-disable */
const imported = require( '@vlsergey/js-config' ).karma;
module.exports = function( config ) {
  imported(config);
  config.set( {
    files: [
      'test/**/*Test.ts',
    ],
  } );
};
