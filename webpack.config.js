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
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
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
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                // 使用file-loader 的话是直接打包进成文件
                // loader: 'file-loader',
                // 使用url-loader 再配合参数的话是把小图片转成base-64
                // loader: 'url-loader',
                loaders: [
                    'url-loader?limit=20000&name=assets/[name]-[hash:5].[ext]'
                    // 压缩loader
                    // 'image-webpack-loader'
                ]
            },
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