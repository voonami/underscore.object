var
    _ = require('underscore');
    _.mixin(require('./underscore.object'));

var Person = _.Class.extend({
    initialize: function() {
        console.log("initializing");
    }
});

var p = new Person({name: "Jason"});
var p2 = new Person({name: "Jason"});
console.log(p2.cid);