const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'js/bundle.js',

	},

	//vue 
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},

	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
				},

				'css-loader',
				'sass-loader'
				]
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'assets/css/main.css',
		})
	]


};