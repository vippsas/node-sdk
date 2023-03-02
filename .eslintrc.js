module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.js', '/examples', 'lib', '*/lib'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    curly: ['error', 'all'],
    'import/prefer-default-export': 'off',
    'max-len': ['error', 120],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/require-default-props': 'off',
  },
};
