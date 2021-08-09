module.exports = {
  root: true,
  env: {
    browser: true,
    node: false
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:import/errors', 'plugin:import/warnings'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['html'],
  rules: {
    'import/no-unresolved': 'warn'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
