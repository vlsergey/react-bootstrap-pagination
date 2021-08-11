/* eslint-disable-next-line */
module.exports = {
  parserOptions: {
    project: [
      './tsconfig.json',
      './src/tsconfig.json',
      './test/tsconfig.json',
    ],
  },
  extends: ['./node_modules/@vlsergey/js-config/src/eslint'],
};
