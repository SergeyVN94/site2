const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const AutoprefixerPlugin = require('autoprefixer');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const find = require('find');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? 'nosources-source-map' : 'inline-source-map';
const PATHS = {
  build: `${__dirname}/dist`,
  src: `${__dirname}/src`,
};
const context = PATHS.src;

const rules = [
  {
    test: /\.pug$/,
    loader: 'pug-loader',
    options: { root: `${PATHS.src}/components` },
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            AutoprefixerPlugin(),
          ],
        },
      },
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            `${PATHS.src}/styles/constants.scss`,
            `${PATHS.src}/styles/mixins.scss`,
          ],
        },
      },
    ],
  },
  {
    test: /.+(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: './fonts',
    },
  },
  {
    test: /\.tsx?$/,
    use: 'ts-loader',
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    exclude: /fonts?/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './images',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 70,
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
        },
      },
    ],
  },
];

const pages = find
  .fileSync(/\.pug$/, `${context}/pages`)
  .map((name) => name.slice(name.lastIndexOf('/') + 1, name.lastIndexOf('.')));

const getOptimization = () => {
  const config = {
    splitChunks: { chunks: 'all' },
  };

  if (isProduction) {
    config.minimizer = [
      new TerserPlugin({
        terserOptions: {},
        cache: true,
        parallel: true,
      }),
    ];
  }

  return config;
};

const getFileName = (extension) => `[name].[${isProduction ? 'contenthash' : 'hash'}]${extension}`;

module.exports = {
  mode,
  devtool,
  context,
  devServer: {
    contentBase: PATHS.build,
    index: 'landing-page.html',
    compress: true,
    port: 9000,
  },
  entry: './index.ts',
  output: {
    path: PATHS.build,
    filename: getFileName('.js'),
  },
  optimization: getOptimization(),
  module: { rules },
  watchOptions: { aggregateTimeout: 100 },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@images': `${context}/assets/images`,
      '@fonts': `${context}/assets/fonts`,
      '@components': `${context}/components`,
    },
  },
  plugins: [
    ...pages.map((page) => {
      return new HtmlWebpackPlugin({
        template: `${PATHS.src}/pages/${page}/${page}.pug`,
        filename: `${PATHS.build}/${page}.html`,
      });
    }),
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyPlugin([
      {
        from: `${PATHS.src}/assets/favicons`,
        to: `${PATHS.build}/favicons`,
      },
    ]),
    new MiniCssExtractPlugin({ filename: getFileName('.css') }),
    new CleanWebpackPlugin(),
  ],
};
