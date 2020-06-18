import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/main.tsx',
  external: ['react', 'react-dom', 'date-fns'],
  output: {
    file:'bundle.js',
    format: 'cjs'
  },
  plugins: [resolve(), typescript()]
};