// 全部加载,按需初始化
define(function(require, exports, module) {
  var initialize, initializeByDom;

  initializeByDom = function(dom) {
    var $el, comp_path;
    $el = $(dom);
    comp_path = $el.data("comp-path");
    if(typeof(comp_path) == undefined) return;
    var m = require('comp/' + comp_path + '/view');
    m.constructor();
  };

  initialize = function() {
    var $comps;
    $comps = $('.js-comp');
    return $comps.each(function() {
      return initializeByDom($(this));
    });
  };

  module.exports = {
    initialize: initialize,
    initializeByDom: initializeByDom
  };

});
