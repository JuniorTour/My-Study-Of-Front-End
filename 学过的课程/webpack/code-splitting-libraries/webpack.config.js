let webpack = require('webpack')
let path = require('path')

module.exports = function (env) {
    return {
        entry: {
            main:'./index.js',
            vendor:'moment'
            /*再次运行 webpack，可以发现生成了两个 bundle。
            然而如果查看他们的代码，会发现 moment 的代码在两个文件中都出现了！
            其原因是 moment 是主应用程序（例如 index.js）的依赖模块，每个入口起点都会打包自己的依赖模块。

             正是由于这个原因，我们需要使用 CommonsChunkPlugin。*/
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // 指定公共 bundle 的名字。
            })
        ]
    }
}
