const { defineConfig } = require('@vue/cli-service');
const ElementPlus = require('unplugin-element-plus/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Pxtorem = require('postcss-pxtorem');
const path = require('path');
const { name } = require('./package');
const tagVersion = process.env.npm_condfig_tagVersion;
const appName = 'market';

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: `/${appName}`,

    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'market',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },

    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '@components': resolve('/src/components'),
                '@utils': resolve('/src/utils')
            },
            extensions: ['.tsx', '.ts'] // 添加 .ts 扩展名
        },
        output: {
            filename: 'js/[name].js',
            chunkFilename: `js/${name}.[name].[contenthash:8].${tagVersion || 'chunk'}.js`,
            library: `${name}-[name]`,
            libraryTarget: 'umd', // 把子应用打包成 umd 库格式
            chunkLoadingGlobal: `webpackJsonp_${name}`
        },
        plugins: [
            ElementPlus({
                useSource: true
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/assets/images', // 图片所在的目录路径
                        to: 'images' // 目标目录路径
                    }
                ]
            })
        ],
        module: {
            rules: [
                /** other code */
                {
                    test: /\.tsx?$/,
                    use: [
                        { loader: 'babel-loader' },
                        {
                            loader: 'ts-loader',
                            // exclude: /node_modules/,
                            options: {
                                transpileOnly: true,
                                appendTsSuffixTo: ['\\.vue$'],
                                happyPackMode: true
                            }
                        }
                    ]
                }
            ]
        },
        devtool: 'source-map'
    },

    css: {
        extract: true,
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: [
                        Pxtorem({
                            // 把px单位换算成rem单位
                            rootValue: 14,
                            unitPrecision: 5,
                            selectorBlackList: [],
                            propList: ['*'],
                            replace: true,
                            mediaQuery: false,
                            minPixelValue: 0
                            // exclude: /node_modules/i
                        })
                    ]
                }
            },
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    namespace: 'market',
                    'primary-color': '#18b3b3',
                    'multiple-height': '30px',
                    'header-height': '48px',
                    'logo-width': '32px',
                    'iconify-bg-color': '#5551',
                    'border-color-base': '#d9d9d9',
                    'disabled-color': '#F5F5F5',
                    'screen-xl': '1200px',
                    'screen-lg': '992px',
                    'screen-md': '768px',
                    'screen-sm': '576px',
                    white: '#ffffff',
                    'error-color': '#f5222d',
                    'warning-color': '#faad14',
                    'success-color': '#52c41a',
                    'component-background': '#ffffff'
                }
            },
            scss: {
                additionalData: '@use "@/styles/element/index.scss" as *;'
            }
        }
    },

    chainWebpack: (config) => {
        // 原svg规则覆盖了所有的svg图标，需要先将自己的svg排除，以应用新的sprite规则
        // src/assets/icons是我们将要存放svg的目录
        config.module.rule('svg').exclude.add(resolve('src/icons')).end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();

        config.module.rule('fonts').type('asset/inline').set('generator', {});
        config.module.rule('images').type('asset/inline').set('generator', {});
    },

    devServer: {
        hot: true,
        allowedHosts: 'all',
        port: 3355,
        https: true,
        client: {
            overlay: false
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        },
        historyApiFallback: {
            disableDotRule: true,
            rewrites: [
                // /login 开头的都返回 login.html
                { from: /\/market\/login/, to: '/market/login.html' },
                // 其它的都返回 index.html
                { from: /./, to: '/market/index.html' }
            ],
            logger: console.log.bind(console)
        },
        proxy: {
            // '/tytech-account': {
            //     target: 'http://192.168.2.249:8201', // 将请求代理到的目标服务器地址
            //     // pathRewrite: { '^/api': '' }, // 重写请求路径，如果 API 的路径中包含 '/api'，将其替换为空字符串
            //     changeOrigin: true // 设置请求头中的 Host 为目标服务器的地址
            // },
            // '/tytech-cost-service': {
            //     target: 'http://192.168.2.160:8201/', // 将请求代理到的目标服务器地址
            //     // pathRewrite: { '^/api': '' }, // 重写请求路径，如果 API 的路径中包含 '/api'，将其替换为空字符串
            //     changeOrigin: true // 设置请求头中的 Host 为目标服务器的地址
            // }
        }
    },

    // lintOnSave: 'warning'
    lintOnSave: false
});
