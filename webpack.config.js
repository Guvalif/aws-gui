const webpack = require('webpack');


const COPYRIGHT =`
Copyright (c) 2018,
- Kazuyuki TAKASE (https://github.com/Guvalif)
- PLEN Project Company Inc. (https://plen.jp)

This software is released under the MIT License.
See also: http://opensource.org/licenses/mit-license.php
`;

const webpack_config = {
    entry: {
        'assets/js/app': `${__dirname}/src/index.ts`
    },

    output: {
        path: __dirname,
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    externals: {
        'paho-mqtt': 'Paho.MQTT',
        'crypto-js': 'CryptoJS'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin(COPYRIGHT)
    ]
}

module.exports = webpack_config;