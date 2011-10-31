(function(_, exports) {
    // Shared empty constructor function to aid in prototype-chain creation.
    var ctor = function(){};

    var inherits = function(parent, protoProps, staticProps) {
        var child;
        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call `super()`.
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
          child = protoProps.constructor;
        } else {
          child = function(){ return parent.apply(this, arguments); };
        }
        // Inherit class (static) properties from parent.
        _.extend(child, parent);
        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);
        // Add static properties to the constructor function, if supplied.
        if (staticProps) _.extend(child, staticProps);
        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;
        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = parent.prototype;
        return child;
    };

    exports.Class = function(properties, options) {
        properties || (properties = {});
        this.__properties__ = properties;
        _.extend(this, properties);
        this.initialize(options);
    };

    _.extend(exports.Class.prototype, {
        initialize: function(options){}
    });

    exports.Class.extend = function (protoProps, classProps) {
      var child = inherits(this, protoProps, classProps);
      child.extend = this.extend;
      return child;
    };

})(typeof _ == 'undefined' ? require('underscore') : _, typeof exports == 'undefined' ? window : exports);
