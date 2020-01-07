const config = require('../webpack.config.test');
const webpackAlias =  require('jest-alias-preprocessor')(config);
const babelJest = require('babel-jest');

module.exports = {
    process: (src, filename, ...rest) => {
        if(filename.indexOf('node_modules') === -1) {
            src = babelJest.process(src, filename, ...rest);
            src = webpackAlias.process(src, filename, ...rest);
        }
        return src;
    },
}
