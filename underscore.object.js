(function(_, exports) {
    // The inherits function is taken almost verbatim from backbone.js 0.5.3.
    var ctor = function(){};
    var inherits = function(parent, protoProps, staticProps) {
        var child;
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
          child = protoProps.constructor;
        } else {
          child = function(){ return parent.apply(this, arguments); };
        }
        _.extend(child, parent);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        if (protoProps) _.extend(child.prototype, protoProps);
        if (staticProps) _.extend(child, staticProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };

    var Object = function(properties, options) {
        if (properties) { _.extend(this, properties); }
        this.initialize(options || {});
    };

    Object.extend = function(protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    }

    _.extend(Object.prototype, {
        initialize: function(options) { }
    });

    if (exports) {
        exports.Object = Object;
    } else {
        _.mixin({Object: Object});
    }
})(typeof _ == 'undefined' ? require('underscore') : _, typeof exports == 'undefined' ? null : exports);
