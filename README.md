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

