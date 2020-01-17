const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const PATHS = {
    build: `${__dirname}/${isProduction ? 'app' : 'dist'}`,
    src: `${__dirname}/src`,
};

const optimization = {
    minimizer: [
        new TerserPlugin({
            terserOptions: {},
            cache: true,
            parallel: true,
        }),
    ],
}

const rules = [
    {
        test: /\.pug$/,
        loader: 'pug-loader',
    },
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
        ],
    },
    {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: '../fonts/',
        },
    },
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
            name: '[folder]/[name].[ext]',
            outputPath: '../images/',
        },
    },
];

const pageList = [
    'landing-page',
    'search-room',
    'room-details',
    'registration',
    'sign-in',
    'ui-kit',
];

const configTemplate = {
    optimization,
    module: {
        rules,
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

module.exports = [
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
                [`index`]: `./pages/${page}/index.ts`,
                [`index-style`]: `./pages/${page}/index.scss`,
            },
            output: {
                path: `${PATHS.build}/${page}`,
                filename: '[name].js',
            },
        });
    }),
];
