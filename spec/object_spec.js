var
    _ = require('underscore');
    _.mixin(require('../underscore.object'));

describe("Object", function() {
    var Person = _.Object.extend({
        first_name: "Bob",
        last_name: "Wiley",
        full_name: function() { return this.first_name + " " + this.last_name }
    });

    it("propagates its extend function", function() {
        expect(Person.extend).toBeDefined();
    });

    describe("single level Object", function() {
        var person;
        beforeEach(function() {
            person = new Person();
        });

        it("has all name properties", function() {
            expect(person.first_name).toBe("Bob");
            expect(person.last_name).toBe("Wiley");
            expect(person.full_name()).toBe("Bob Wiley");
        });
    });
});