const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{  // v2 loader pattern
            test: /\.jsx$/,
            loader: "babel-loader",
            options: {
                presets: ['env']
            }
        }]
    }
};