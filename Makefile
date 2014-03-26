clean:
	npm cache clean && rm -rf node_modules/*

install:
	make clean && npm install

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive --reporter spec --timeout 3000 test

test-cov:
	@NODE_ENV=test ./node_modules/.bin/mocha --require blanket --recursive --timeout 3000 -R travis-cov test

.PHONY: test test-cov
