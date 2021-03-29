/* eslint-disable */
const imported = require( '@vlsergey/js-config' ).eslint;
module.exports = {
  ...imported,
  parserOptions: {
    ...imported,
    project: [ './tsconfig.json', './src/tsconfig.json', './test/tsconfig.json' ],
  },
  rules: {
    ...imported.rules,
    'import/no-unused-modules': 0,
  },
};
