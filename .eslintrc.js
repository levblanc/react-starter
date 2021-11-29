// http://eslint.org/docs/user-guide/configuring

module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['import', 'html'],
  extends: ['prettier', 'plugin:json/recommended'],
  globals: {
    CONFIG: true,
  },
  // custom rules below
  rules: {
    // indent: ['error', 2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
    indent: 0,
    'key-spacing': 0,
    'no-multi-spaces': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-console': 0,
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    // don't require .js file extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
      },
    ],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for redux state
          'e', // for e.returnvalue
        ],
      },
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
