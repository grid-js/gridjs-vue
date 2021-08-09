const config = {
  input: 'build/main.js',
  bundleNodeModules: true,
  externals: ['vue'],
  output: {
    format: ['cjs', 'esm', 'umd'],
    minify: true,
    moduleName: 'Grid',
    extractCSS: false,
    dir: 'dist/'
  },
  plugins: {
    babel: false,
    vue: {
      target: 'browser'
    }
  }
}
export default config
