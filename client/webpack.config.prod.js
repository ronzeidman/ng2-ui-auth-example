/**
 * Created by Ron on 03/10/2016.
 */
const webpack = require('webpack');
const common = require('./webpack.config.common');
const path = require('path');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = Object.assign(common, {
    entry: './src/bootstrap.aot.ts',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        publicPath: '/',
        filename: 'bundle.min.js'
    },
    plugins: [
        new TsConfigPathsPlugin({tsconfig: path.resolve(__dirname, 'tsconfig.prod.json')}),
        /**
         * Plugin: ContextReplacementPlugin
         * Description: Provides context to Angular's use of System.import
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
         * See: https://github.com/angular/angular/issues/11580
         */
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.resolve(__dirname, 'src')
        ),
        new webpack.DefinePlugin({PRODUCTION: JSON.stringify(true)}),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        })
    ]
});
