/**
 * Create by Zwl on 2019/7/2
 * @Description:
 */

'use strict';
const  {fixBabelImports,override,addLessLoader } = require("customize-cra");
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
    })
);


