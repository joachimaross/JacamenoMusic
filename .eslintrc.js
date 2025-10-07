module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  ignorePatterns: ['dist', 'build', 'node_modules', '.next'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
}
