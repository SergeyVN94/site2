const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const PATHS = {
    build: `${__dirname}/${isProduction ? 'app' : 'dist'}`,
    src: `${__dirname}/src`,
};

const rules = [
    {
        test: /\.pug$/,
        loader: 'pug-loader',
    },
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader",
        ],
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
    },
    {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: `./fonts/`,
        },
    },
]

const pageList = [
    // 'landing-page',
    // 'search-room',
    // 'room-details',
    // 'registration',
    // 'sign-in',
    'ui-kit',
];

const configTemplate = {
    module: {
        rules
    },
    context: PATHS.src,
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    devtool: 'inline-source-map',
    watchOptions: {
        aggregateTimeout: 100,
    },
    mode: isProduction ? 'production' : 'development',
};

const fontsConfig = {
    context: PATHS.src,
    entry: {
        fonts: './fonts/fonts.css',
    },
    module: {
        rules,
    },
    output: {
        path: PATHS.build,
        filename: 'fonts/[name].js'
    },
};

module.exports = [
    fontsConfig,
    ...pageList.map((page) => {
        return ({
            ...configTemplate,
            plugins: [
                new HtmlWebpackPlugin({
                    template: `${PATHS.src}/pages/${page}/index.pug`,
                    filename: `${PATHS.build}/${page}/index.html`,
                    
                }),
            ],
            entry: {
                [`${page}/index`]: `./pages/${page}/index.js`,
                [`${page}/index-style`]: `./pages/${page}/index.scss`,
            },
            output: {
                path: PATHS.build,
                filename: '[name].js',
            },
        });
    }),
];
