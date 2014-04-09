var parser = require('./parser');

// let rec step_com (c: com) (sigma: state) : com * state = match c with
//  | Skip

module.exports = function() {

	var REPLACE = 0,
		ASSIGN  = 1,
		EXTRACT = 2

	this.execute = function (action,sigma) {
		var r = parser.parse(action);

		switch (r.type) {
			case REPLACE:
				replace(r,sigma); 
				break;
			case ASSIGN:
				assign(r,sigma);
				break;
			case EXTRACT:
				extract(r,sigma);
				break;
			default:
				console.log(r);
		}

		return sigma;
	};

	function replace(rule,sigma) {
		var value = String(rule.val);
		var x = value;

		if (value.substring(0,1) === '$') {
			x = value.substring(1);
			value = sigma[value.substring(1)];
		}

		sigma[x] = value.replace(new RegExp(rule.regex, rule.flags), rule.repl);
	}

	function extract(rule,sigma) {
		var v = rule.variable;
		var value = rule.val;

		var o = sigma[v];
		return o[value];
	}

	function assign(rule,sigma) {
		var val = rule.val;

		if (typeof val === 'object' && val.type === EXTRACT) {
			val = extract(val, sigma);
		}

		sigma[rule['variable']] = val;
	}

}