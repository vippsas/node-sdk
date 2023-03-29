import esbuild from 'esbuild';
import pkg from './package.json' assert { type: 'json' };

/** @type { import('esbuild').BuildOptions } */
const config = {
  bundle: true,
  entryPoints: ['./src/index.ts'],
  platform: 'node',
  target: 'node14',
  external: Object.keys(pkg.dependencies),
};

await esbuild.build({
  ...config,
  format: 'esm',
  outfile: 'lib/index.mjs',
});

await esbuild.build({
  ...config,
  format: 'cjs',
  outfile: 'lib/index.cjs',
});
