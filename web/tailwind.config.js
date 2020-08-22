module.exports = {
    purge: {
        enabled: process.env.ENV === 'production',
        content: [
            'views/pages/**/*.js',
            'views/components/**/*.js',
            'nuxt.config.js'
        ]
    },
    future: {
        removeDeprecatedGapUtilities: true
    },
    theme: {},
    variants: {},
    plugins: []
};
