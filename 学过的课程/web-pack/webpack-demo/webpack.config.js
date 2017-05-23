var path=require('path')

module.exports= {
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }]
    },
    entry:'./app/vendor.js',
    output: {
        filename:'bundle.js',
        path:path.resolve(__dirname+'dist')
    }
}
//如果存在 webpack.config.js，webpack 命令将默认选择使用它。