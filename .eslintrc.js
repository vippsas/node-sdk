module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  ignorePatterns: ['.eslintrc.js', 'babel.config.js', '/lib'],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    curly: ['error', 'all'],
    'max-len': ['error', 120],
  },
  env: {
    node: true,
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: [],
    },
  },

  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
        'max-len': ['error', 120],
      },
    },
  ],
};
