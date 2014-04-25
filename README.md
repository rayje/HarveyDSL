HarveyDSL
=========

A DSL for Harvey actions

## Description

The HarveyDSL is a project to define a small grammar that is
expected to simplify action definitions when creating Harvey
test cases.

### Grammar definitons:

	expr ::= assign 
		| replace 
		| extract 
		| random

	assign ::= chars charsAndDigits ws ":=" ws (random | extract | charAndDigits)

	extract ::= "$" chars charsAndDigits "." chars charsAndDigits

	replace ::= 's/' regexBody '/' replacement '/' flags ws value

	random ::= "random" ws (randomString | randomNumber)

	randomString ::= "string" digits ":" chars
	
	randomNumber ::= "number" digits ":" digits

	chars ::= [a-zA-Z]+

	digits ::= [0-9]+

	charAndDigits ::= [a-zA-Z0-9]+

	ws ::= "\t" 
		| " "

	replacement ::= [^/]* 

	flags ::= [gimy]*  

	value ::= [^/}{]*

	sourceChar ::= .
	
	regexBody ::= regexFirstChar regexChar*

	regexFirstChar ::= [*\\/[] regexNonTerminator
	  | regexBackslashSeq
	  | regexClass

	regexChar ::= [\\/[] regexNonTerminator
	  | regexBackslashSeq
	  | regexClass

	regexBackslashSeq ::= "\\" regexNonTerminator

	regexNonTerminator ::= lineTerminator sourceChar

	regexClass ::= "[" regexClassChar* "]"

	regexClassChar ::= ![\]\\] regexNonTerminator 
		| regexBackslashSeq



### In progess:

    base64 {value} (needs more thought)
        value ::= ?

    stringify {json} (needs more thought)
        json ::= ?

    now (needs more thought)
        now (!)inUTC (!)IsoString

    crypto (needs more thought)
        crypto type:HMAC alg:sha1 data:xxxx key:ccccc enc:hex


License
=======
The MIT License (MIT)

Copyright (c) 2014 Rayland Jeans

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
