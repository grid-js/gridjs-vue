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
    vue: {
      target: 'browser',
      runtimeHelpers: true,
      css: true
    },
    babel: {
      presets: ['vue', ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      configFile: false
    },
    'node-resolve': true
  },
  external: 'crypto'
}
