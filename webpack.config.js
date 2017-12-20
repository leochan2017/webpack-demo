const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist/', // 输出目录
        filename: 'js/[name]-bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/', // 排除不用处理的目录
                include: '/src/', // 指定处理的范围
                query: {
                    presets: ['latest'] // 告诉babel怎么处理我们的js
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html', // 输出文件名
            template: 'index.html', // 模版html
            inject: 'body'
        })
    ]
}