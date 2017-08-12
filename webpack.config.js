
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({ filename: "stylesheets/[name].css", allChunks: true, });

module.exports = {
    entry: {
        app: __dirname + "/src/index.js"
    },
    output: {
        path: __dirname + "/public/",
        filename: ((webpack) =>{
            return "javascripts/[name].js"
        })()
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [
                {loader: 'babel-loader'}
            ],
        }, {
            test: /\.(css|sass|scss)$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass,
        new webpack.optimize.UglifyJsPlugin()
    ]
};
