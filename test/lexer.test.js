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

});
