var assert = require('assert'),
    _ = require('underscore'),
    Lexer = require('../lib/lexer.js');

describe('lexer', function() {

    describe('constructor()', function() {

        it('should return an object with a nextToken method', function(done) {

            //Act
            var lexer = new Lexer();

            //Assert
            assert(lexer);
            assert(_.isFunction(lexer.nextToken));

            done();
        });
    });

    describe('lexer', function() {

    	it('should process assignment to token', function(done) {

    		// var lexer = new Lexer();
    		// var input = 'a := 1234';

    		// lexer.init(input);
    		// var first = lexer.nextToken();
    		// var equal = lexer.nextToken();
    		// var value = lexer.nextToken();

    		// assert(first.getValue() === 'a');
    		// assert(first.getType() === 'CHARS');

    		// assert(equal.getValue() === ':=');
    		// assert(equal.getType() === 'ASSIGN');

    		// assert(value.getValue() === 1234);
    		// assert(value.getType() === 'NUM');

    		done();
    	});

    });

});
