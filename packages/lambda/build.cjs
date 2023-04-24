require('esbuild')
    .build({
        entryPoints: ['src/uploadHandler.ts', 'src/aggregatorHandler.ts'],
        bundle: true,
        minify: false,
        outdir: 'build',
        platform: 'node',
        target: 'node18.0',
        format: 'esm',
        banner: {
            js: `
            import { fileURLToPath } from 'url';
            import { createRequire as topLevelCreateRequire } from 'module';
            const require = topLevelCreateRequire(import.meta.url);
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = fileURLToPath(new URL(".", import.meta.url));
            `,
        },
    })
    .catch(() => process.exit(1));
