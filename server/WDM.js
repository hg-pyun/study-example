import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js'

const webpackCompiler = webpack(webpackConfig);

export default webpackDevMiddleware(webpackCompiler,{

    // lazy가 true일 경우, request가 있을 때만 reload.
    lazy: false,

    // watch options (only lazy: false)
    watchOptions: {
        aggregateTimeout: 150,
        poll: true
    },

    // 빌드된 소스가 올라갈 memory path
    publicPath: '/build',

    stats: {
        colors: true
    },
    serverSideRender: true,
});