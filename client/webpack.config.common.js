/**
 * Created by Ron on 03/10/2016.
 */
const webpack = require('webpack');
const path = require('path');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
    context: __dirname,
    entry: './src/bootstrap.aot.ts',
    // debug: true,
    output: {
        path: path.resolve(__dirname, 'bundle'),
        publicPath: '/',
        filename: 'bundle.min.js'
    },
    resolve: {
        extensions: ['d.ts', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.jpg$/,
                loaders: [
                    'url?limit=10000'
                ]
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file?name=fonts/[name].[ext]"
            },
            {
                test: /\.css$/,
                loaders: [
                    'to-string',
                    'css-loader'
                ],
                include: [path.resolve(__dirname, 'src', 'components')]
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: [path.resolve(__dirname, 'src', 'components')]
            },
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeAttributeQuotes: false,
                    caseSensitive: true,
                    customAttrSurround: [
                        [/#/, /(?:)/],
                        [/\*/, /(?:)/],
                        [/\[?\(?/, /(?:)/]
                    ],
                    customAttrAssign: [/\)?\]?=/]
                }
            }
        ]
    },
    plugins: [
        new TsConfigPathsPlugin({ tsconfig: path.resolve(__dirname, 'tsconfig.json') }),
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
        )
    ]
};
