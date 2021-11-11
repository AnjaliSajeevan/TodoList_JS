
const path = require('path');
const  MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './app/index.js'
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins:[
        new MiniCSSExtractPlugin({
            filename: '[name].css',
            chunkFilename:'[id].css'
        }),
        new HTMLWebpackPlugin({
            template:'index.html'
        })
    ],
    module:{
        rules: [
            { 
                test: /\.scss$/i,
                use:[
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        static:{
            directory:path.resolve(__dirname,'data')
        },
        port:9000,
        compress:true
      }
}

