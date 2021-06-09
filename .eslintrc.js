module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:import/errors', 'plugin:import/warnings'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['html'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
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
