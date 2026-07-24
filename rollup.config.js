import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { readFile } from 'node:fs/promises';

const svgAssets = () => ({
  name: 'svg-assets',
  async load(id) {
    if (!id.endsWith('.svg')) {
      return null;
    }

    const referenceId = this.emitFile({
      type: 'asset',
      name: id.split('/').pop(),
      source: await readFile(id),
    });

    return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
  },
});

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs(),
    svgAssets(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      modules: true,
      extract: false,
      minimize: true,
    }),
  ],
};
