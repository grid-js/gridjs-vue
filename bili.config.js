module.exports = {
  jsCompiler: 'babel',
  input: ['src/index.browser.mjs', 'src/index.mjs'],
  bundleNodeModules: true,
  output: {
    format: ['cjs', 'esm', 'umd'],
    minify: true,
    moduleName: 'Grid',
    extractCSS: false
  },
  plugins: {
    string: {
      include: 'node_modules/**/*.css'
    },
    vue: {
      target: 'browser'
    },
    babel: {
      presets: ['vue', ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
      plugins: ['@babel/plugin-transform-runtime'],
      babelHelpers: 'runtime',
      configFile: false
    },
    'node-resolve': true
  },
  resolvePlugins: {
    string: require('rollup-plugin-string').string
  },
  external: 'crypto'
}
