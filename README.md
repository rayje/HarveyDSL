HarveyDSL
=========

A DSL for Harvey actions

## Description

The HarveyDSL is a project to define a small grammar that is
expected to simplify action definitions when creating Harvey
test cases.

### Grammar definitons:

    extract
        body.access_token

    extract ::= ("body"|"headers") "." field
    field   ::= ?

    replace: (substitution)
        s/regex/replacement/{flags} value
        s/^users\/(.*)$/1/i users/12345
        s/{regex}/{replacement}/{flags} {value}

    replace ::= "s/" regex "/" replacement "/" (flags)* value
    regex ::= ?
    replacement ::= ?
    flags ::= ?
    value ::= ?

    random (needs more thought)
        random (string|number)

        random number 0 to 100
        random string from [a-zA-Z] length 10

    random ::= (string|number)
    string ::= "string from" "[" chars "]" "length" num
    number ::= "number" num "to" num
    num    ::= N
    chars  ::= ascii chars

    set: (assignment)
        myAccessToken := value
        
        value ::= string
            | int 
            | extract
            | date
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
