const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const os = require('os');
const cores = os.cpus().length;

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
            outputPath: '/fonts/',
        },
    },
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
];

const pageList = [
    'landing-page',
    // 'search-room',
    // 'room-details',
    // 'registration',
    // 'sign-in',
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
                new CopyWebpackPlugin([
                    {
                        from: `${PATHS.src}/fonts`,
                        to: `${PATHS.build}/fonts`,
                    },
                    {
                        from: `${PATHS.src}/images/${page}`,
                        to: `${PATHS.build}/${page}/images`,
                    },
                ]),
            ],
            entry: {
                [`${page}/index`]: `./pages/${page}/index.ts`,
                [`${page}/index-style`]: `./pages/${page}/index.scss`,
            },
            output: {
                path: PATHS.build,
                filename: '[name].js',
            },
        });
    }),
];
