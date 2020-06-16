module.exports = {
  jsCompiler: 'babel',
  input: 'src/index.js',
  output: {
    format: ['cjs', 'esm', 'umd'],
    extractCSS: false,
    bundleNodeModules: true,
    minify: true,
    moduleName: 'Grid'
  },
  plugins: {
    vue: {
      css: true,
      runtimeHelpers: true
    },
    scss: true,
    babel: {
      presets: ['vue', ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      configFile: false
    },
    'node-resolve': true
  }
}
