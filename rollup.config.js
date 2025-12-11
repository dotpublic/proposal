import babel from '@rollup/plugin-babel';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import rollupCopy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

// Recreate __dirname in ESM
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
  input: 'src/assets/js/main.js', // Entry point of your application
  output: {
    file: 'docs/js/bundle.js', // Output bundle for static hosting
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      configFile: resolve(process.cwd(), 'babel.config.json'),
      exclude: 'node_modules/**',
    }),
    rollupCopy({
      targets: [
        { src: 'src/assets/img', dest: 'docs' }
      ]
    }),
    ...(process.env.ROLLUP_MINIFY ? [terser()] : [])
  ],
};
