/**
 * 扩展常规方法,是$的静态方法
 * @type {[type]}
 */
$.extend({
  getQueryString: function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  },
  joinQueryString: function(data){
    var list = [];
    for(var i in data){
      if(data[i] !== '') {
        var arr=[];
        arr.push(i);
        arr.push(data[i]);
        list.push(arr.join("="));
      }
    }
    if(list.length) return list.join("&"); return false;
  }
});

/**
 * 为查询的节点对象扩展方法,是基于$的原型扩展的方法
 * @type {[type]}
 */
$.fn.extend({
  watch: function(callback) {
    return this.each(function() {
      //缓存以前的值
      $.data(this, 'originVal', $(this).val());
      //event
      $(this).on('keyup paste', function() {
        var originVal = $(this, 'originVal');
        var currentVal = $(this).val();

        if (originVal !== currentVal) {
          $.data(this, 'originVal', $(this).val());
          callback(currentVal);
        }
      });
    });
  }
});

/**
 * 载入完成执行方法
 * @type {Boolean}
 */
$(function(){
  $.ajaxSetup({
    cache: false,
    timeout: 10000,
    //发送请求前触发
    beforeSend: function(xhr){

    },
    //请求成功后触发
    success: function(data){

    },
    //请求失败遇到异常触发
    error: function(xhr, status, e){
      switch(xhr.status){
        case 401:
          location.href = '/login';
          break;
        case 404:
          return true;
          break;
        case 502, 503:
          alert("系统生病了，程序猿GG正在抢救");
          break;
        case 504:
          alert("啊，网络不是很给力啊~");
          break;
        default:
          alert(xhr.responseText || "未知故障");
          break;
      }
    },
    //完成请求后触发。即在success或error触发后触发
    complete: function(xhr, status){

    },
  });
});

/**
 * // 对Date的扩展，将 Date 转化为指定格式的String
 * // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * // 例子：
 * // new Date().format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * // new Date().format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
