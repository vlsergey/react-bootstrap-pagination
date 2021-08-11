/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imported = require('@vlsergey/js-config').karma;

/* eslint-disable-next-line no-undef */
module.exports = function (config) {
  imported(config);
  config.set({
    files: [
      'test/**/*Test.ts',
    ],
  });
};
