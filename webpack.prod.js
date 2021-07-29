const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
               ]
            },
            plugins: [
                new HtmlWebPackPlugin({
                    template: "./src/client/views/index.html",
                    filename: "./index.html",
                }),
                new MiniCSSExtractPlugin({
                    filename: "[name].css",
                    chunkFilename: "[id].css"
                }),
                new WorkboxPlugin.GenerateSW()
            ]
}
