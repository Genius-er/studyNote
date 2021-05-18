const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production',

  // 防止指定包（使用cdn引进来的包）打包到bundle中
  // 忽略打包，就要手动用cdn引进指定包到html中
  externals: {
    // 拒绝jQuery被打包进来
    jquery: 'jQuery'
  }
};
