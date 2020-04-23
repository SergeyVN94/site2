const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const AutoprefixerPlugin = require('autoprefixer');
const Webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

const PATHS = {
    build: `${__dirname}/dist`,
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
        exclude: /node_modules/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        AutoprefixerPlugin(),
                    ],
                    sourceMap: true,
                },
            },
            'sass-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        `${PATHS.src}/styles/colors.scss`,
                        `${PATHS.src}/styles/mixins.scss`,
                        `${PATHS.src}/styles/breakpoints.scss`,
                    ],
                },
            },
        ],
    },
    {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: './fonts',
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
        exclude: /fonts/,
        options: {
            name: '[name].[ext]',
            outputPath: './images',
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
    entry: './index.ts',
    output: {
        path: `${PATHS.build}`,
        filename: '[name].js',
    },
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
    {
        plugins: [
            new CopyPlugin([
                {
                    from: `${PATHS.src}/chunks/favicons`,
                    to: PATHS.build,
                },
            ]),
        ],
    },
    ...pageList.map((page) => {
        return ({
            ...configTemplate,
            plugins: [
                new HtmlWebpackPlugin({
                    template: `${PATHS.src}/pages/${page}/index.pug`,
                    filename: `${PATHS.build}/${page}.html`,
                }),
                new CopyPlugin([
                    {
                        from: `${PATHS.src}/chunks/favicons`,
                        to: PATHS.build,
                    },
                ]),
                new Webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                }),
            ],
        });
    }),
];
