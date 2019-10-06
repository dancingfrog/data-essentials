const fs = require('fs');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        // 'pb': path.resolve(__dirname, 'src/main.ts')
        app: [ './demo/main.ts' ]
    },
    cache: false,
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        contentBase: path.join(__dirname, 'demo'),
        compress: true,
        lazy: true,
        port: 9000
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                // Transform our own .css files with PostCSS and CSS-modules
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }, {
                // Do not transform vendor's CSS with CSS-modules
                // The point is that they remain in global scope.
                // Since we require these CSS files in our JS or CSS files,
                // they will be a part of our compilation either way.
                // So, no need for ExtractTextPlugin here.
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                // Query parameters are passed to node-sass
                loader: 'style!css!compass?outputStyle=expanded&' +
                'includePaths[]=' +
                (path.resolve(__dirname, './node_modules'))
            }
        ]
    },
    output: {
        // path: path.resolve(__dirname, 'dist'),
        path: path.resolve(__dirname, 'demo'),
        filename: '[name].js'
    },
    plugins: [
        new BrowserSyncPlugin(
            {
                browser: [
                    (fs.existsSync('/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox')) ?
                        '/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox' :
                        (fs.existsSync('C:\\Program Files\\Firefox Developer Edition\\firefox.exe')) ?
                            'C:\\Program Files\\Firefox Developer Edition\\firefox.exe' :
                            'firefox',
                ],
                files: [{
                    match: [ 'demo/**/*.js' ],
                    fn: function(event, file) {
                        if (event === "change") {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }],
                injectChanges: true,
                notify: true,
                host: 'localhost',
                port: 3000,
                server: {
                    baseDir: [ path.resolve(__dirname, 'demo') ]
                }
            },
            // plugin options
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                reload: false
            }

        ),
        new HtmlWebpackPlugin('D3 Demo')
    ],
    resolve: {
        extensions: [ '.ts', '.js', '.scss' ]
    }
};
