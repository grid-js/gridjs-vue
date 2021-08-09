const config = {
  input: 'src/main.ts',
  bundleNodeModules: true,
  externals: ['vue'],
  output: {
    format: ['cjs', 'esm', 'umd'],
    minify: true,
    moduleName: 'Grid',
    extractCSS: false,
    sourceMap: true,
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
