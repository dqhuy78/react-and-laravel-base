const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");
const tailwindcss = require('tailwindcss');

const purgeCss = require('@fullhuman/postcss-purgecss')({

    content: [
        './src/**/*.js',
    ],

    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
    webpack: {
        plugins: [
            new WebpackBar({ profile: true }),
            ...(process.env.NODE_ENV === "development"
                ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
                : [])
        ]
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    "@primary-color": "red",
                    "@link-color": "#1DA57A"
                }
            }
        }
    ],
    style: {
        postcss: {
            plugins: [
                require('postcss-import'),
                tailwindcss('./tailwind.config.js'),
                require('postcss-nested'),
                require('autoprefixer'),
                // ...process.env.NODE_ENV === 'production'
                //     ? [purgeCss]
                //     : []
            ]
        }
    }
};
