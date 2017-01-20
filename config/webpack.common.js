var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

// function isExternal(module) {
//     var userRequest = module.userRequest;
//
//     console.log( 'isExternal: ', userRequest);
//
//     if (typeof userRequest !== 'string') {
//         return false;
//     }
//
//     return userRequest.indexOf('bower_components') >= 0 ||
//         userRequest.indexOf('node_modules') >= 0 ||
//         userRequest.indexOf('libraries') >= 0;
// }
//
// var bpmn = [
//     './src/bpmn.ts',
//     'bpmn-js',
//     'diagram-js',
//     'diagram-js/lib/features/global-connect/GlobalConnect.js',
//     'diagram-js-direct-editing',
// ];

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        // 'bpmn': bpmn,
        'bpmn': './src/bpmn.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            // },
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?\d+)?$/,
                loader: 'file?name=graphics/[name].[ext]'
            },
            {
                test: /\.bpmn$/,
                loader: 'file?name=diagrams/[name].[ext]'
            },
            {
                test: /\.less/,
                loader: "less"
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                exclude: helpers.root('public'),
                include: helpers.root('src', 'app'),
                // https://github.com/webpack/style-loader/issues/123:
                loaders:[ExtractTextPlugin.extract('style', 'css-loader'), 'to-string', 'css', 'less-loader']
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'app',
        //     minChunks: function(module, count) {
        //         return isExternal(module);
        //     }
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'bpmn',
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'polyfills',
        // }),
        //
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'bpmn',
        //     minChunks: function(module) {
        //         return isExternal(module);
        //     }
        // }),
        //
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'bpmn', 'vendor', 'polyfills'],
            // minChunks: function(module) {
            //     return isExternal(module);
            // }
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
