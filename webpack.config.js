const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const devtool = isDevelopment ? "source-map" : null;
const watchOptions = {
    aggregateTimeout: 100
}
const _module = {
    rules: [{
            test: /\.pug$/,
            use: {
                loader: 'pug-loader'
            }
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            }
        }
    ]
}
const optimization = {
    splitChunks: {
        chunks: 'all'
    }
}

function getConfig(page) {
    const entry = {};
    const name = page.replace(/[\ -]/i, '_');
    entry[name] = `./index.js`;
    entry[name + '_style'] = `./index.scss`;

    return {
        context: `${__dirname}/src/pages/${page}`,
        entry: entry,
        output: {
            path: `${__dirname}/app/${page}`,
            filename: '[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `${__dirname}/src/pages/${page}/index.pug`
            })
        ],
        module: _module,
        devtool: devtool,
        watch: isDevelopment,
        watchOptions: watchOptions,
        optimization: optimization
    }
}

module.exports = [
    // getConfig('ui-kit'),
    // getConfig('landing-page'),
    // getConfig('search-room'),
    // getConfig('room-details'),
    // getConfig('registration'),
    getConfig('sign-in')
];