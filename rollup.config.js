/*
 * @Author: machao
 * @Date: 2023-04-25 13:04:33
 * @LastEditors: machao
 * @LastEditTime: 2023-04-26 13:37:05
 */
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: './src/index.js',
  dest: 'input-time.js',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup']
    })
  ],
  format: 'umd',
  moduleName: 'inputTime'
};
