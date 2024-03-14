const pluginJson = require('./src/plugin.json');
module.exports.getWebpackConfig = (config, options) => ({
    ...config,
    output: {
        ...config.output,
        publicPath: `public/plugins/${pluginJson.id}/`,
    },
    externals: [
        ...config.externals,
        'antd',
    ],
    module: {
        rules: [
            ...config.module.rules,
            {
                test: /\.(ts|tsx)?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env","@babel/preset-react","@babel/preset-typescript"],
                        plugins: [
                            [
                                "import",
                                {
                                    "libraryName": "antd",
                                    "libraryDirectory": "es",
                                    "style": "css"
                                },
                            ],
                        ],
                    },
                },
                exclude: /node_modules/,
                include: /src/,
            },
        ]
    }
});