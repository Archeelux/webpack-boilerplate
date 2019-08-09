const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
module.exports = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].bundle.js"
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/pages/index.pug",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            chunkFilename: "[id].css"
        }),
        new StyleLintPlugin({
            configFile: path.resolve(__dirname, "stylelint.config.js"),
            context: path.resolve(__dirname, "src/css"),
            files: "**/*.css",
            failOnError: false,
            quiet: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ["html-loader", "pug-html-loader"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: __dirname + "/../../public/css/"
                        }
                    },
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: "./postcss.config.js"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "img/",
                            publicPath: "img/"
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: {
                    loader: "eslint-loader",
                    options: {
                        configFile: __dirname + "/.eslintrc"
                    }
                }
            }
        ]
    }
};
