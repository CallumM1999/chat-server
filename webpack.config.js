const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
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
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/main.css',
        }),
        new webpack.ProvidePlugin({
            Vue: 'vue'
        }),

        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            // asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ]
};