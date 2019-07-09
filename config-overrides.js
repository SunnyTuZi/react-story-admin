/**
 * Create by Zwl on 2019/7/2
 * @Description:
 */

const  {fixBabelImports,override,addLessLoader ,addWebpackAlias} = require("customize-cra");
const path = require('path');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    addLessLoader({
        strictMath: true,
        noIeCompat: true,
        localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    }),
    addWebpackAlias({
        ['public']: path.resolve(__dirname, "src/public"),
        ['@components']: path.resolve(__dirname, "src/components"),
    })
);


