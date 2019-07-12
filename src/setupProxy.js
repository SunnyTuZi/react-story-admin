/**
 * Create by Zwl on 2019/7/3
 * @Description:
 */

const proxy = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        proxy("/api", {
            target: "http://192.168.123.42:3000",
            changeOrigin: true

        })
    );

};


