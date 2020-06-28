import commonjs from 'rollup-plugin-commonjs'
import VuePlugin from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { string } from 'rollup-plugin-string'

export default [
  {
    input: './src/index.js',
    output: {
      file: './dist/grid.test.js',
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      string({
        include: '**/*.css'
      }),
      commonjs(),
      VuePlugin({
        target: 'browser',
        runtimeHelpers: true
      }),
      babel({
        presets: ['vue', ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        configFile: false
      }),
      resolve({
        preferBuiltins: true
      })
    ],
    external: 'crypto'
  }
]
