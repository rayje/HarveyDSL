{
	var REPLACE        = 0,
		ASSIGN         = 1,
		EXTRACT        = 2,
		RANDOM_STRING  = 3,
		RANDOM_NUMBER  = 4;

	function makeInteger(o) {
		if (typeof o === "string") {
			return parseInt(o);
		}

		return parseInt(o.join(""), 10);
	}
}

start = expr

expr = assign / replace / extract / random

assign = variable:charsAndDigits whitespace ":=" whitespace val: (random / extract / charsAndDigits) { 
	return {
		type:ASSIGN, 
		variable:variable, 
		val:val
	}; 
}

extract = "$" variable:charsAndDigits "." val:charsAndDigits {
	return {
		type: EXTRACT,
		variable: variable,
		val: val
	};
}

/* 
 * Search and replace
 *     s/regex/replacement/flags value|variable
 *
 *     regexBody:
 *         The regular expression to execute for the replacement.
 * 
 *     replacement:
 *         Capture used for replacement
 *
 *     flags:
 *         Flags to use in regex
 *
 *     value|variable:
 *         The value or variable to replace
 */
replace 
	= 's/' regex:$regexBody  '/' repl:replacement '/' f:flags " " val:value { 
		return {
			type:REPLACE, 
			regex:regex, 
			repl:repl, 
			flags: f, 
			val: val
		}; 
	}

random = randomString / randomNumber

randomString = "random string" whitespace length:digits ":" chars:chars {
	return {
		type: RANDOM_STRING,
		length: makeInteger(length),
		chars: chars
	}
}

randomNumber = "random number" whitespace min:digits ":" max:digits {
	return {
		type: RANDOM_NUMBER,
		min: makeInteger(min),
		max: makeInteger(max)
	}
}



charsAndDigits = $[a-z0-9]i+

chars = $[a-z]i+

digits = $[0-9]+

replacement = $[^/]i* 

flags = $[gimy]*  

value = $[^/}{]i*

sourceChar = .

whitespace = "\t" / " "

lineTerminator = [\n\r\u2028\u2029]

regexBody = regexFirstChar regexChar* 

regexFirstChar = ![*\\/[] regexNonTerminator
  / regexBackslashSeq
  / regexClass

regexChar = ![\\/[] regexNonTerminator
  / regexBackslashSeq
  / regexClass

regexBackslashSeq = "\\" regexNonTerminator

regexNonTerminator = !lineTerminator sourceChar

regexClass = "[" regexClassChar* "]"

regexClassChar = ![\]\\] regexNonTerminator / regexBackslashSeq