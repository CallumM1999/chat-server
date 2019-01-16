const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        polyfills: './src/js/polyfills.js',
        index: './src/js/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/bundle.js',
        filename: 'js/[name].bundle.js',
    },

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
        }),
        new webpack.ProvidePlugin({
            Vue: 'vue'
        })
    ]
};