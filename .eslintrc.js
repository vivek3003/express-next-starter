module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": "off",
    "no-console": 'off',
    "object-curly-newline": 'off',
    "max-len": 'off',
    "react/jsx-filename-extension": 'off',
    "react/react-in-jsx-scope": 'off',
    "jsx-a11y/html-has-lang": 'off',
    "jsx-a11y/alt-text": 'off',
    "import/prefer-default-export": 'off',
    "jsx-a11y/anchor-is-valid": 'off',
    "react/forbid-prop-types": 'off',
    "react/require-default-props": 'off',
    "jsx-a11y/label-has-for": 'off',
    "react/no-multi-comp": 'off',
    "jsx-a11y/click-events-have-key-events": 'off',
    "jsx-a11y/no-static-element-interactions": 'off',
    "no-alert": 'off',
    "react/no-danger": 'off',
    "jsx-a11y/no-noninteractive-element-interactions": 'off',
    "lines-between-class-members": 'off',
    'react/jsx-one-expression-per-line': 'off'
  },
};
