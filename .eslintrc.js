/* eslint-env node */
const imported = require( '@vlsergey/eslint-config' );
module.exports = {
  ...imported,
  rules: {
    ...imported.rules,
    'import/no-unused-modules': 0,
  },
};
