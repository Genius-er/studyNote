const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个模式
process.env.NODE_ENV = 'development';

// 复用loader
const commonCssLoader = [
    // 把css单独提取出来，在plugins中进行new
    MiniCssExtractPlugin.loader,

    'css-loader',
    // 对css进行兼容性处理
    {
        // 还需再package.json中设置如下
        /*"browserslist": {
            "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
            ],
            "production": [
                ">0.01%",
                "not dead",
                "not op_mini all"
            ]
        }*/
        loader:'postcss-loader',
        options:{
            postcssOptions:{
                ident:'postcss',
                plugins:['postcss-preset-env']
            }
        }
    }]

module.exports = {
    entry: './src/js/index.js',
    output: {
        // 处理处理图片发生的错误,要与图片的outputPath
        publicPath:'./imgs',
        filename:'js/build.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            // 处理css文件
            {
                test:/\.css$/,
                use:[
                    // 'style-loader',
                    ...commonCssLoader
                ]
            },
            // 处理less文件
            {
                test:/\.less$/,
                use:[
                    ...commonCssLoader,
                    'less-loader'
                ]
            },

            /*
                正常来讲，一个文件只能被一个loader处理。
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                先执行eslint 在执行babel
                */
            // js语法检查
            {
                // 再package.json中添加如下
                /*"eslintConfig": {
                    "extends": "airbnb-base"
                }*/
                test:/\.js$/,
                exclude:/node_modules/,
                // 优先执行
                enforce: 'pre',
                loader:'eslint-loader',
                options:{
                    // 自动修复eslint的错误(只能修复warning)
                    fix:true
                }

            },
            // 处理js兼容性
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    presets:[
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                // 使用的corejs包的版本
                                corejs: {version: 3},
                                // 兼容到什么浏览器版本
                                targets: {
                                    chrome: '60',
                                    firefox: '50'
                                }
                            }
                        ]
                    ]
                }
            },

            // 处理图片
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options:{
                    // 图片资源小于8k转换为base64
                    limit:8*1024,
                    // 重命名处理后的图片文件
                    name:'[hash].[ext]',
                    // 输出路径
                    outputPath:'imgs',
                    // 关掉es6的模块化
                    esModule:false
                }
            },
            // 处理html中img图片资源
            {
                test:/\.html$/,
                // 这里使用的是commonjs的模块化，需要在处理图片的模块关掉es6的模块化
                loader: 'html-loader'
            },
            // 处理其他文件
            {
                exclude: /\.(js|css|less|html|jpg|png|gif)$/,
                loader: 'file-loader',
                options:{
                    // 处理后的文件输出到的路径
                    outputPath:'media'
                }
            }

        ]
    },
    plugins:[
        // 把css单独提取出来的包
        new MiniCssExtractPlugin({
            filename:'css/build.css'
        }),
        // 压缩css的包
        new OptimizeCssAssetsWebpackPlugin(),
        // 处理html文件
        new HtmlWebpackPlugin({
            // 需要处理的html文件，不写的话，打包自动生成一个没有结果的html文件
            template:'./src/index.html',
            // 压缩html文件
            minify:{
                // 去除空格
                collapseWhitespace:true,
                // 去除注释
                removeComments:true
            }
        })
    ],
    // 这个模式js自动压缩
    mode:'production',

    // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server（要下载webpack-dev-server这个模块,这个工具依赖webpack）
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
};