module.exports = {
  jsCompiler: 'babel',
  input: 'src/index.js',
  output: {
    format: ['cjs', 'esm', 'umd'],
    bundleNodeModules: true,
    minify: true,
    moduleName: 'Grid',
    extractCSS: false
  },
  plugins: {
    string: {
      include: 'node_modules/**/*.css'
    },
    vue: {
      target: 'browser',
      babelHelopers: 'runtime',
      css: true
    },
    babel: {
      presets: ['vue', ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
      plugins: ['@babel/plugin-transform-runtime'],
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      configFile: false
    },
    'node-resolve': true
  },
  resolvePlugins: {
    string: require('rollup-plugin-string').string
  },
  external: 'crypto'
}
