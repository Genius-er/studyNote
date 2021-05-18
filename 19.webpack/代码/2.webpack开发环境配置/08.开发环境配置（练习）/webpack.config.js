const  { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './src/js/index.js',
    output : {
        publicPath : './',
        filename : 'js/build.js',
        path : resolve(__dirname, 'build')
    },

    module : {
        rules : [
            // 处理less文件
            {
                test : /\.less$/,
                use : ['style-loader','css-loader','less-loader']
            },
            // 处理css文件
            {
                test : /\.css$/,
                use : ['style-loader','css-loader']
            },
            // 处理图片资源
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'imgs'
                }
            },
            // 处理html中img标签中的src资源
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // 处理其他资源
            {
                exclude: /\.(js|css|less|png|jpg|gif|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }

        ]
    },

    plugins : [
        // 处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',

    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    }
};