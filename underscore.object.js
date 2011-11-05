// Underscore.Object
// Copyright (c) 2011 Voonami
// Freely distributable under the terms of the MIT license.
// The inherits function is taken almost verbatim from backbone.js 0.5.3.

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
        if (protoProps) { _.extend(child.prototype, protoProps); }
        // Add static properties to the constructor function, if supplied.
        if (staticProps) { _.extend(child, staticProps); }
        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;
        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = parent.prototype;
        return child;
    };

    var Object = function(properties, options) {
        if (properties) { _.extend(this, properties); }
        this.superInit = function(options) {
            if (this.__parentInit__ !== undefined) {
                _.bind(this.__parentInit__, this);
                this.__parentInit__(options);
            }
        };
        this.initialize(options || {});
    };

    Object.extend = function(protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.prototype.__parentInit__ = this.prototype.initialize;
        child.extend = this.extend;
        return child;
    };

    _.extend(Object.prototype, {
        initialize: function(options) { }
    });

    if (exports) {
        exports.Object = Object;
    } else {
        _.mixin({Object: Object});
    }
})(typeof _ == 'undefined' ? require('underscore') : _, typeof exports == 'undefined' ? null : exports);
