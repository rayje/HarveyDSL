var assert = require('assert'),
    _ = require('underscore'),
    parser = require('../lib/parser.js');

describe('parser', function() {

    describe('constructor()', function() {

        it('should return an object with a parse method', function(done) {

            //Assert
            assert(parser);
            assert(_.isFunction(parser.parse));

            done();
        });
    });

    describe('parse random', function() {

        it('should parse random string', function(done) {

            var action = 'random string 10:abcde';
            var result = parser.parse(action);

            assert(result.type === 3);
            assert(parseInt(result.length) === 10);
            assert(result.chars === 'abcde');

            done();
        });

        it('should parse random number', function(done) {

            var action = 'random number 1:10';
            var result = parser.parse(action);

            assert(result.type === 4);
            assert(parseInt(result.min) === 1);
            assert(parseInt(result.max) === 10);

            done();
        });

        it('should parse assign random number', function(done) {

            var action = 'test := random number 1:10';
            var result = parser.parse(action);

            assert(result.type === 1);
            assert(result.variable === 'test');
            assert(typeof result.val === 'object');
            assert(parseInt(result.val.type) === 4, "expected 4 got: " + result.val.type);
            assert(parseInt(result.val.min) === 1, "expected 1 got: " + result.val.min);
            assert(parseInt(result.val.max) === 10, "expected 10 got: " + result.val.max);

            done();
        });
    });

});
