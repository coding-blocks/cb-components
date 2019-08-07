import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import scss from 'rollup-plugin-scss'

const production = process.env.NODE_ENV == 'production'

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: 'src/main.js',
	output: {
		sourcemap: production,
		format: 'iife',
		file: production ? 'dist/index.js' : 'example/bundle.js',
		name
	},
	plugins: [
		svelte({
			customElement: true
		}),
		resolve(),
		production && terser(),
		!production && serve('example'),
		!production && livereload({
			watch: 'example'
		}),
		scss({
			output: 'example/bundle.css'
		})
	]
};
