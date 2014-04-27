var assert = require('assert'),
    _ = require('underscore'),
    parser = require('../lib/parser.js');

var REPLACE = 0,
	ASSIGN  = 1,
	EXTRACT = 2,
	RANDOM_STRING = 3,
	RANDOM_NUMBER = 4;

function expectedMessage(expected, result) {
	return "Expected \n" + JSON.stringify(expected, null, 2) + 
	"\n got \n" + JSON.stringify(result, null, 2);
}

describe('parser', function() {

    describe('constructor()', function() {

        it('should return an object with a parse method', function(done) {

            //Assert
            assert(parser);
            assert(_.isFunction(parser.parse));

            done();
        });
    });

    describe('parse() random', function() {

        it('should parse random string', function(done) {

            var action = 'random string 10:abcde';
            var expected = {
            	type: RANDOM_STRING,
            	length: 10,
            	chars: 'abcde'
            };

            var result = parser.parse(action);
            assert(_.isEqual(expected, result), 
            	expectedMessage(expected, result));

            done();
        });

        it('should parse random number', function(done) {

            var action = 'random number 1:10';
            var expected = {
            	type: RANDOM_NUMBER,
            	min: 1,
            	max: 10
            };

            var result = parser.parse(action);

            assert(_.isEqual(expected, result), 
            	expectedMessage(expected, result));

            done();
        });

        it('should parse assign random number', function(done) {

            var action = 'test := random number 1:10';
            var expected = {
            	type: ASSIGN,
            	variable: "test",
            	val: {
            		type: RANDOM_NUMBER,
            		min: 1,
            		max: 10
            	}
            };

            var result = parser.parse(action);
            assert(_.isEqual(expected, result), 
            	expectedMessage(expected, result));

            done();
        });
    });

});
