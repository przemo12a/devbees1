const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('./../stylesheets/app.css');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: "./_javascript/main.js",
    output: {
        filename: "app.js",
        path: path.join(__dirname, "assets/javascript")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env"]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            },
            {
                test: /\.css|\.scss$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: "css-loader", options: { sourceMap: true } },
                        { loader: "postcss-loader", options: {
                            sourceMap: true,
                            plugins: function () {
                                return [autoprefixer({ grid: false })];
                            }
                        } },
                        { loader: "sass-loader", options: { sourceMap: true } }
                    ]
                })
            }
        ]
    },
    devtool: 'source-map',
    stats: { children: false },
    plugins: [
        extractSass
    ]
};