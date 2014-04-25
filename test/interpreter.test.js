var assert = require('assert'),
    _ = require('underscore'),
    Interpreter = require('../lib/interpreter');

describe('interpreter', function() {

    describe('constructor()', function() {

        it('should return an object with an execute method', function(done) {

            //Act
            var interpreter = new Interpreter();

            //Assert
            assert(interpreter);
            assert(_.isFunction(interpreter.execute));

            done();
        });
    });

    describe('interpreter', function() {

    	it('should process assignment', function(done) {

    		var interpreter = new Interpreter();

			var action = 'a := b';
			var sigma = {test: 'users/12345', x: {name: 'bob'}};

			sigma = interpreter.execute(action, sigma);

			assert(sigma.a === "b");

    		done();
    	});

    	it('should process search and replace', function(done) {

    		var interpreter = new Interpreter();

    		var action = 's/^users\\\/(.*)$/$1/i $test';
			var sigma = {test: 'users/12345', x: {name: 'bob'}};

			sigma = interpreter.execute(action, sigma);

			assert(sigma.test === "12345");

    		done();
    	});

    	it('should process extract and assign', function(done) {

    		var interpreter = new Interpreter();

			var action = 'x := $x.name';
			var sigma = {test: 'users/12345', x: {name: 'bob'}};

			sigma = interpreter.execute(action, sigma);

			assert(sigma.x === "bob");

    		done();
    	});

    });

});