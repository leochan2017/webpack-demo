const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    // context: __dirname,
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
                // 排除不用处理的目录
                // path.resolve 可以直接解释成绝对路径
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'), // 指定处理的范围
                query: {
                    presets: ['latest'] // 告诉babel怎么处理我们的js
                }
            },
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import')(),
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ]
                        }
                    }
                ]
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