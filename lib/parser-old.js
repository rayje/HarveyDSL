module.exports = function(options) {
	var lookahead = [];
	var p = 0;
	var lexer = null;
	var size = 0;

    this.init = function(l, k) {
        lexer = l;
        size = k;

        for (int i = 0; i < size; i++) {
        	consume();
        }
    };    

    this.consume = function() {
    	lookahead[p] = lexer.nextToken();
    	p = (p+1) % size;
    };

    this.lookaheadToken = function(i) {
    	return lookahead[(p+i-1) % size];
    };

    this.lookaheadType = function(i) {
    	return this.lookaheadToken(i).getType();
    };

    this.match = function(int x) {
        if (lookaheadType(1) == x) {
            consume();
        } else {
            throw new Error("Expecting " + lexer.getTokenName(x) + "; found " + LT(1));
        }

    };
}