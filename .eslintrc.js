module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'ts', 'tsx'] },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: 'React를 import할 필요가 없습니다.',
          },
        ],
      },
    ],
    // curly: ['error', 'multi'],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: 'expo-router',
            group: 'builtin',
            position: 'before',
          },
          // {
          //   pattern: 'react',
          //   group: 'external',
          //   position: 'before',
          // },
          // {
          //   pattern: 'react-native',
          //   group: 'external',
          //   position: 'before',
          // },
          {
            pattern: '#store/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '#pages/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '#components/*',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-native'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-console': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-no-bind': 'off',
    'no-use-before-define': 'off',
    'spaced-comment': 'off',
  },
}
