module.exports = {
  // jsCompiler: 'babel',
  banner: true,
  output: {
    extractCSS: false
  },
  plugins: {
    vue: {
      css: true
    },
    scss: true,
    babel: {
      presets: ['vue', ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
      runtimeHelpers: true
    }
  }
}
