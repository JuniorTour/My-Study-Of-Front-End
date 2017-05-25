let path = require('path');

let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            // use: [ 'style-loader', 'css-loader' ]
            /*这里有一个缺点就是，你无法使用浏览器的能力，去异步且并行去加载 CSS。
            取而代之的是，你的页面需要等待整个 JavaScript 文件加载完，才能进行样式渲染。

             webpack 能够用 ExtractTextWebpackPlugin 帮助你将 CSS 单独打包，以解决以上问题。*/
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};
//如果存在 webpack.config.js，webpack 命令将默认选择使用它。