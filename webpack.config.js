var webpack = require('webpack')

module.exports = {
	entry: __dirname + '/src/main.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'stage-0', 'react']
			}
		}
		]
	}
}