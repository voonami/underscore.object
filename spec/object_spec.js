var
    _ = require('underscore');
    _.mixin(require('../underscore.object'));

describe("Object", function() {
    var Person = _.Object.extend({
        first_name: "Bob",
        last_name: "Wiley",
        initialize: function() {
            this.age = 42;
        },
        full_name: function() { return this.first_name + " " + this.last_name }
    }, {
        newPerson: function() {
            return new this();
        }
    });

    it("propagates its extend function", function() {
        expect(Person.extend).toBeDefined();
    });

    it("sets properties in the initialize", function() {
        expect((new Person()).age).toBe(42);
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
        it("has static properties", function() {
            expect(Person.newPerson().first_name).toBe("Bob");
        });
        it("creates children without its static props", function() {
            expect(person.newPerson).toBeUndefined();
        });
        it("extends children with its static props", function() {
            var Child = Person.extend({});
            expect(Child.newPerson).toBeDefined();
        });
    });

    describe("inheritance with super", function() {
        var Base = _.Object.extend({
            initialize: function() {
                this.base = "Base";
            }
        });
        var Child = Base.extend({
            initialize: function() {
                this.child = "Child";
                this.superInit();
            }
        })
        it("Uses super", function() {
            var actual = new Child();
            expect(actual.base).toBe("Base");
            expect(actual.child).toBe("Child");
            // Be sure the object is still the same - needs its own test
            var base = new Base();
            expect(base.base).toBe("Base");
        });
    });
});