/** @type {import('lint-staged').Config} */
module.exports = {
  '*.{js, ts, tsx}': 'eslint --fix',
  '*.{ts,tsx}': [() => 'tsc -p . --noEmit --pretty false'],
};
