var EOF = -1;
var EOF_TYPE = 1;
var NAME = 2;
var COMMA = 3;
var DOT = 4
var LBRACK = 5;
var RBRACK = 6;
var EQUALS = 7;

var tokenNames = ["n/a", "<EOF>", "NAME", "COMMA", "DOT", "LBRACK", "RBRACK", "EQUALS"];

module.exports = function(options) {
	var lookahead = [];
	var p = 0;
	var input, c;

    this.init = function(str) {
        input = str;

        // prime lookahead
        c = input.charAt(p);
    }     

    this.match = function(x) {
        if (c === x) {
        	consume();
        } else {
        	throw new Error("expecting " + x + "; found " + c);
        }
    }

    this.consume = function() {
    	p++;

    	if (p >= input.length())
    		c = EOF;
    	else
    		c = input.charAt(p);
    }

    this.nextToken = function() {
    	while (c != EOF) {
    		switch (c) {
    			case ' ':
    			case '\t':
    			case '\n':
    			case '\r':
    				ws();
    				continue;
    			case ',':
    				consume();
    				return new Token(COMMA, ",");
    			case '.':
    				consume();
    				return new Token(DOT, ",");
    			default:
    				throw new Error("invalid character: " + c);
    		}
    	}

    	return new Token(EOF_TYPE, "<EOF>");
    };

    this.getTokenName = function(x) {
        return tokenNames[x];
    }

    function isLETTER() {
        return c >= 'a' && c<= 'z' || c >='A' && c<= 'Z';
    }

    function name() {
        var value = "";
        do {
            value += c;
            consume();
        } while ( isLETTER() );

        return new Token(NAME, value);
    }

    function ws() {
        while ( c ==' ' || c =='\t' || c =='\n' || c =='\r' )
        	consume();
    }

}