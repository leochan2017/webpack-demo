var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: './src/script/main.js',
        a: './src/script/a.js',
        b: './src/script/b.js',
        c: './src/script/c.js'
    },
    output: {
        path: __dirname + '/dist/', // 输出目录
        publicPath: 'http://cdn.com', // 上线地址，如此参数存在，则生成的index.html绝对地址以这个开头的路径
        filename: 'js/[name]-[chunkhash].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'a.html', // 输出文件名
            template: 'index.html', // 模版html
            inject: false,
            title: 'This is a.html',
            // chunks: ['main', 'a'], // 按需插入指定的js
            excludeChunks: ['b', 'c'] // 和上面的方法反着来，意思是：除了声明的这2个，其余都排除
        }),
        new htmlWebpackPlugin({
            filename: 'b.html', // 输出文件名
            template: 'index.html', // 模版html
            inject: false,
            title: 'This is b.html',
            // chunks: ['b'], // 按需插入指定的js
            excludeChunks: ['a', 'c'] // 和上面的方法反着来，意思是：除了声明的这2个，其余都排除
        }),
        new htmlWebpackPlugin({
            filename: 'c.html', // 输出文件名
            template: 'index.html', // 模版html
            inject: false,
            title: 'This is c.html',
            // chunks: ['c'], // 按需插入指定的js
            excludeChunks: ['a', 'b'] // 和上面的方法反着来，意思是：除了声明的这2个，其余都排除
        })
    ]
}