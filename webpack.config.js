const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        open: true, // автоматическое открытие браузера
        compress: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(hbs|handlebars)$/,
                use: ['handlebars-loader'],
            },
        ],
    },
};