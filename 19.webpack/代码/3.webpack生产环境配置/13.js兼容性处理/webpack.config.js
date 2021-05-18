const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /*
        js兼容性处理：babel-loader @babel/core 
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换

          2. 全部js兼容性处理 --> @babel/polyfill  (这个包要下载)，使用这个只需要在要进行语法兼容的js源文件中import这个包
            问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，【体积太大】了~

          3. （最终解决1+3步）需要做兼容性处理的就做：按需加载  --> core-js（需要下载这个包）
          // 使用第三种就不可以用第二种，这种方式大大缩小文件
      */  
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              /*1. 基本js兼容性处理 --> @babel/preset-env
              问题：只能转换基本语法，如promise高级语法不能转换*/
              '@babel/preset-env',

                // 3. 需要做兼容性处理的就做：按需加载  --> core-js
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }

            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
