/**
 * Create by Zwl on 2019/4/29
 * @Description:
 */

'use strict';

/**
 *
 * @param p '时间格式：yyyy-MM-dd hh:mm:ss'
 * @returns {*}
 */

Date.prototype.format = function(p) {
  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  var day = this.getDate();
  var hour = this.getHours();
  var minute = this.getMinutes();
  var second = this.getSeconds();
  if (!p) return;
  var o = { 'y+': year, 'M+': month, 'd+': day, 'h+': hour, 'm+': minute, 's+': second };
  for (var key in o) {
    var reg = new RegExp(key);
    p.replace(reg, function($1) {
      p = p.replace($1, handle(o[key]))
    })

  }
  return p
  //补全两位数
  function handle(num) {
    return num >= 10 ? num : '0' + num;
  }

}
