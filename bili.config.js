module.exports = {
  jsCompiler: 'babel',
  input: 'src/index.js',
  output: {
    format: ['cjs', 'esm', 'umd'],
    bundleNodeModules: true,
    minify: true,
    moduleName: 'Grid'
  },
  plugins: {
    vue: {
      runtimeHelpers: true
    },
    babel: {
      presets: ['vue', ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      configFile: false
    },
    'node-resolve': true
  }
}
