require('esbuild').build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: false,
    outfile: 'build/bundle.js',
    platform: 'node',
    target: 'node18.0',
    format: 'cjs',
    banner: {},
});
