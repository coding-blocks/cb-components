import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import scss from 'rollup-plugin-scss'
import replace from 'rollup-plugin-replace';
import copy from 'rollup-plugin-copy'


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
		file: production ? 'dist/index.js' : 'example/index.js',
		name
	},
	plugins: [
		replace({
			API_HOST: production ? 'https://hack-api.codingblocks.com/' : 'http://localhost:3000/',
			HB_HOST: production ? 'https://hack.codingblocks.com' : 'http://localhost:4200',
			'css="bundle.css"': ''
		}),
		svelte({
			customElement: true
		}),
		resolve({
			allowSyntheticDefaultImports: true
		}),
		production && terser(),
		!production && serve('example'),
		!production && livereload({
			watch: 'example'
		}),
		scss({
			output: production ? 'dist/bundle.css' : 'example/bundle.css',
			outputStyle: 'compressed'
		}),
		copy({
			targets: [
				{ src: 'example/index.html', dest: 'dist/' },
				{ src: 'images', dest: 'dist/' }
			  ]
		}),
	]
};
