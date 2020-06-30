import typescript from 'rollup-plugin-typescript2'
//import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';
import {terser} from "rollup-plugin-terser";

export default {
  input: './src/main.tsx',
  external: [
    ...Object.keys(pkg.dependencies || {})
   ],
  output: [
    {
     file: pkg.main,
     format: 'cjs'
    },
    {
     file: pkg.module,
     format: 'es' // the preferred format
    },
    {
     file: pkg.browser,
     format: 'iife',
     name: 'MyPackage' // the global which can be used in a browser
    }
   ],
  plugins: [typescript(), terser()]
};