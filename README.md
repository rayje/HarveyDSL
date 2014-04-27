HarveyDSL
=========

A Domain Specific Language for Harvey Actions

## Description

The HarveyDSL is a project to experiment with a small grammar 
that could potentially to simplify action definitions when creating 
Harvey test cases.

## Overview

Actions defined in the current Harvey project are described 
using JSON. This approach provides a simple representation 
to interpret action definitions. The benefits from this
approach are the simplicity that the JavaScript Object Notation
provides. It allows users not familiar with programming
languages, such as JavaScript, to still be able to define
test cases in the Harvey framework. There is also the 
simplicity for the programmer. Since Harvey is written in 
JavaScript, converting the JSON to javascript is as simple as
```javascript
var object = JSON.parse("{}");
```

The drawbacks, however, are when combined with features such
as action chaining, the definitions begin to appear a bit 
verbose and sometimes a bit difficult to interpret by the user. 
With numerous test cases, the time it takes for a user to 
generate test cases increases, due to the extra time taken
to interpret the embedded JSON objects used for action 
definitions. This goes against one of the reasons to implement
a DSL, "*To increase development productivity*".

This project attempts to simplify this by creating a DSL to 
define actions that do not require JSON. The DSL generated 
by this project tries to provide a simple grammer that can 
be used to make action definitions easier to create and
interpret by the user.

## Examples

The current actions that are used in Harvey are:

* set (assignment)
* replace
* extract
* random
* base64
* stringify
* now
* crypto

### Assignment:
	
The current assignment definition contains the following JSON
object definition:

```JSON
{
	"$set": {
		"<key>": "<value>""	
	}
}
```

where `key` is the name of the variable whose value will 
be set by the assignment, and `value` is the result of 
the interpretation of the value object. 

In Harvey, the value object can be either a string, a number,
or another Harvey action.

The proposed new assignment grammer contains a smaller
assignment string:

	"<key> := <value>"

The definitions for `key` and `value` have not changed,
only their representation to the user.

### Replacement

The current replacement definition contains the following JSON
representation:

	{
		"$replace": {
			"value": <value>,
			"regex": <regex>,
			"flags": <flags>,
			"replacement": <replacement>
		}
	}

The `$replace` definition by itself is not very useful, it
is usually part of another Harvey action, such as an assigment.

The proposed new syntax for replacement is similar to a Perl 
style regular expression:

	"s/<regex>/<replacement>/<flags> <value>"

Example:

	"s/^users\\\/(.*)$/$1/i 'users/12345'"

The example above would replace the current syntax:

	{
		"$replace": {
            "value": "users/12345",
            "regex": "^users/(.*)$",
            "flags": "i",
            "replacement": "$1"
		}
	}

### Extract

The current syntax for an extract action contains the following
JSON:

	{
		"$extract": "<object>.<property>"
	}

The `$extract` syntax is the simplest of the Harvey actions,
but is still defined in terms of JSON.

The proposed syntax for extract is just as simple:

	"$<object>.<property>"

The `$extract` definition by itself is also not very useful.
It is also usually used as part of another Harvey action.

When used with assignment, the following is an example if chaining
two actions, assignment and extract.

	"token := $body.token"

This compared to the current syntax is much smaller and easier to
interpret.

	{
		"$set": {
			"token": {
				"$extract": "body.token"
			}
		}
	}

### Random

The current syntax for the random action takes two forms depending
on the expected result. The first is a random string and the second
is a random number:

#### Random String

	{
        "$random": {
            "type": "string",
            "length": <length>,
            "characters": <chars>
        }
    }

#### Random Number

	{
        "$random": {
            "type": "number",
            "min": <min>,
            "max": <max>
        }
    }

The proposed replacement for these definitions are:

#### Random String

	"random string <length>:<chars>"

#### Random Number

	"random number <min>:<max>"



### Grammar definitons:

	action ::= assign 
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

	regexClassChar ::= [\]\\] regexNonTerminator 
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
