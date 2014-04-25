{
	var REPLACE = 0,
		ASSIGN  = 1,
		EXTRACT = 2
}

start = expr

expr = assign / replace / extract

assign = variable:charsAndDigits " := " val: (extract / charsAndDigits) { 
	return {
		type:ASSIGN, 
		variable:variable, 
		val:val
	}; 
}

charsAndDigits = $[a-z0-9]i+

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