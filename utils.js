// some helpers and cross-browser fixes

_ = {
  listen : function(element, type, callback) {
    if ('attachEvent' in element) {
      // hacky, but we have no images,
      // and i think it'll do for 3h no library task
      if (type === 'DOMContentLoaded') {
        type = 'load';
      }
      element.attachEvent('on' + type, callback);
    } else {
      // we don't want to use useCapture now
      element.addEventListener(type, callback, false);
    }
  },
  extend : function(source, ext) {
    for (var key in ext) {
      if (typeof source[key] === 'undefined' &&
          typeof ext[key] !== 'undefined' ) {
        source[key] = ext[key];
      }
    }
    return source;
  },
  id : function(id) {
    return document.getElementById(id);
  },
  create : function(tag) {
    return document.createElement(tag);
  },
  rnd : function(bound) {
    return Math.ceil(Math.random() * bound)
  }
};

_.Log = function() {
  var log = {};

  this.time = function(key) {
    log[key] = {
      start : ( new Date() ).getTime()
    }
  }
  this.end = function(key, node) {
    log[key] && (log[key].end = ( new Date() ).getTime());
    if (node) {
      node.innerHTML = ( log[key].end - log[key].start );
    } else {
      return log[key].end - log[key].start;
    }
  }
}