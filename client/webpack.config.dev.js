/**
 * Created by Ron on 03/10/2016.
 */
const webpack = require('webpack');
const common = require('./webpack.config.common');
const path = require('path');

module.exports = Object.assign(common, {
    entry: './src/bootstrap.ts',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: common.plugins.concat([
        new webpack.DefinePlugin({PRODUCTION: JSON.stringify(false)})
    ])
});
