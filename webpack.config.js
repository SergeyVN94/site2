const HtmlWebpackPlugin = require('html-webpack-plugin');

const pageName = 'ui-kit';
const path = `${__dirname}/src/${pageName}`;


module.exports = {
    entry: [
        `${path}/index.js`,
        `${path}/index.scss`
    ],
    output: {
        path: `${__dirname}/app/`,
        filename: 'main.js'
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.pug$/,
            use: ['pug-loader']
        }, {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${path}/index.pug`
        })
    ]
}