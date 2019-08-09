module.exports = {
    plugins: {
        "postcss-import": {},
        "postcss-preset-env": {
            browsers: "last 2 versions"
        },
        cssnano: {},
        autoprefixer: {},
        "postcss-simple-vars": {},
        "postcss-font-magician": {
            variants: {
                "Source Sans Pro": {
                    "300": [],
                    "400": [],
                    "300i": [],
                    "400i": []
                },
                foundries: ["google"]
            }
        },
        "postcss-nested": {},
        lost: {}
    }
};
