const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const autoprefixer = require('autoprefixer'); // eslint-disable-line import/no-extraneous-dependencies

const CSS_REGEX = /\.css$|\.scss$/
var useCssModules = true;

var config = {
    entry: ['whatwg-fetch', 'babel-polyfill', './src/main.js'],
    output: {
        path: __dirname+"/dist",
        filename: 'index.js',
    },
    devServer: {
        port: 8080
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: CSS_REGEX,
                loader: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    {
                      loader: 'css-loader',
                      query: {
                        modules: useCssModules,
                        importLoaders: useCssModules ? 2 : '',
                        localIdentName: useCssModules ? '[name]__[local]__[hash:base64:5]' : ''
                      }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        plugins: [
                          autoprefixer({ browsers: ['last 4 versions'] }),
                        ],
                      }
                    },
                    { loader: 'sass-loader', options: {} }
                  ]
                }),
          },
          {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=128&name=/imgs/[hash].[ext]'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./css/[name].css"),
    ]
}
module.exports = config;
