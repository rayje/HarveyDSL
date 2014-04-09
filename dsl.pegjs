{
	var REPLACE = 0,
		ASSIGN  = 1,
		EXTRACT = 2
}

start = expr

expr = assign / replace / extract

assign = variable:CharsAndDigits " := " val: (extract / CharsAndDigits) { 
	return {
		type:ASSIGN, 
		variable:variable, 
		val:val
	}; 
}

CharsAndDigits = $[a-z0-9]i+

extract = "$" variable:CharsAndDigits "." val:CharsAndDigits {
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
 *     RegularExpressionBody:
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
	= 's/' regex:$RegularExpressionBody  '/' repl:replacement '/' f:flags " " val:value { 
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

SourceCharacter = .

// Separator, Space
Zs = [\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]

WhiteSpace "whitespace"
  = "\t"
  / "\v"
  / "\f"
  / " "
  / "\u00A0"
  / "\uFEFF"
  / Zs

LineTerminator
  = [\n\r\u2028\u2029]

RegularExpressionBody
  = rf:RegularExpressionFirstChar re:RegularExpressionChar* 

RegularExpressionFirstChar
  = ![*\\/[] RegularExpressionNonTerminator
  / RegularExpressionBackslashSequence
  / RegularExpressionClass

RegularExpressionChar
  = ![\\/[] RegularExpressionNonTerminator
  / RegularExpressionBackslashSequence
  / RegularExpressionClass

RegularExpressionBackslashSequence
  = "\\" RegularExpressionNonTerminator

RegularExpressionNonTerminator
  = !LineTerminator SourceCharacter

RegularExpressionClass
  = "[" RegularExpressionClassChar* "]"

RegularExpressionClassChar
  = ![\]\\] RegularExpressionNonTerminator
  / RegularExpressionBackslashSequence