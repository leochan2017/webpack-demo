var webpack = require('webpack');

var description = 'Created by leo';
description += '\n' + new Date();
description += '\n';
description += '\n                                  _oo8oo_';
description += '\n                                 o8888888o';
description += '\n                                 88" . "88';
description += '\n                                 (| -_- |)';
description += '\n                                 0\\  =  /0';
description += '\n                               ___/\'===\'\\___';
description += '\n                             .\' \\\\|     |// \'.';
description += '\n                            / \\\\|||  :  |||// \\';
description += '\n                           / _||||| -:- |||||_ \\';
description += '\n                          |   | \\\\\\  -  /// |   |';
description += '\n                          | \\_|  \'\'\\---/\'\'  |_/ |';
description += '\n                          \\  .-\\__  \'-\'  __/-.  /';
description += '\n                        ___\'. .\'  /--.--\\  \'. .\'___';
description += '\n                     ."" \'<  \'.___\\_<|>_/___.\'  >\' "".';
description += '\n                    | | :  `- \\`.:`\\ _ /`:.`/ -`  : | |';
description += '\n                    \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /';
description += '\n                =====`-.____`.___ \\_____/ ___.`____.-`=====';
description += '\n                                  `=---=`';
description += '\n';
description += '\n';
description += '\n               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~';
description += '\n';
description += '\n                          佛祖保佑          不要有bug';
description += '\n';


var host = './';

module.exports = {
    entry: host + 'js/entry.js',
    output: {
        // path: host + '',
        path: __dirname + '/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(description)
    ]
}



