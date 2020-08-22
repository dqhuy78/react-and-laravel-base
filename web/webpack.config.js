/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const BrotliPlugin = require('brotli-webpack-plugin');

const {
    APP_URL,
    APP_BACKEND_DIR,
    HMR_HOST,
    HMR_PORT,
    SENTRY_DSN,
    isProduction
} = require('./config/env');

const devServerUrl = `${APP_URL}:${HMR_PORT}`;
const usingDevServer = process.argv[1].includes('webpack-dev-server');
const publicPath = 'assets/webpack/';
const outputPath = path.resolve(__dirname, APP_BACKEND_DIR);
const StyleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';
const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        localIdentName: '[local]_[hash:7]'
    }
};

module.exports = {
    mode: isProduction ? 'production' : 'development',

    entry: {
        app: [
            path.resolve('./src/index.js'),
            path.resolve('./src/assets/styles/app.scss'),
            path.resolve('./src/assets/styles/theme/ant-custom.less')
        ]
    },

    output: {
        path: path.resolve(outputPath, publicPath),
        publicPath: usingDevServer ? `http://${devServerUrl}/${publicPath}` : `/${publicPath}`,
        filename: isProduction ? '[name].[hash:7].js' : '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            StyleLoader,
                            CSSModuleLoader
                        ]
                    },
                    {
                        use: [
                            StyleLoader,
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    indent: 'postcss',
                                    plugins: [
                                        require('tailwindcss'),
                                        require('autoprefixer')
                                    ],
                                }
                            }
                        ]
                    }
                ]
            },

            {
                test: /\.scss$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            StyleLoader,
                            CSSModuleLoader,
                            'sass-loader'
                        ]
                    },
                    {
                        use: [
                            StyleLoader,
                            'css-loader',
                            'sass-loader'
                        ]
                    }
                ]
            },

            {
                test: /\.less$/,
                use: [
                    StyleLoader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            importLoaders: 2,
                            javascriptEnabled: true,
                            sourceMap: false
                        }
                    }
                ]
            },

            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:7].css'
        }),

        new webpack.EnvironmentPlugin({
            APP_URL
        }),

        new ManifestPlugin(),

        ...(isProduction ? [
            new BrotliPlugin({
                asset: '[path].br[query]',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8
            }),

            new OptimizeCssAssetsPlugin(),

            new CleanWebpackPlugin(),

            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'report.html',
                openAnalyzer: false
            })
        ] : [])
    ],

    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            '@': path.resolve(__dirname, 'src')
        }
    },

    devServer: {
        host: HMR_HOST,
        port: HMR_PORT,

        public: devServerUrl,
        publicPath: `/${publicPath}`,

        headers: {
            'Access-Control-Allow-Origin': '*'
        },

        progress: true,
        noInfo: true,
        clientLogLevel: 'warning',

        overlay: {
            errors: true
        },

        writeToDisk: filePath => /manifest\.json$/.test(filePath)
    },

    performance: {
        hints: false
    },

    devtool: isProduction ? '#source-map' : '#eval-source-map'
};
/* eslint-enable */
