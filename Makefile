.DELETE_ON_ERROR:

BIN           = ./node_modules/.bin
TESTS         = $(shell find src -path '*/__tests__/*-test.js')
FIXTURES      = $(shell find src -path '*/__tests__/*-fixture/*.js')
SRC           = $(filter-out $(TESTS) $(FIXTURES), $(shell find src -name '*.js'))
LIB           = $(SRC:src/%=lib/%)
MOCHA_OPTS    = -R dot

build::
	@$(MAKE) -j 8 $(LIB)

benchmark:
	@node ./bench.js

lint::
	@$(BIN)/eslint src

check::
	@$(BIN)/flow --show-all-errors src

test::
	@$(BIN)/babel-node $(BIN)/_mocha $(MOCHA_OPTS) $(TESTS)

ci::
	@$(BIN)/babel-node $(BIN)/_mocha --watch $(MOCHA_OPTS) $(TESTS)

doctoc:
	@$(BIN)/doctoc --title '**Table of Contents**' ./README.md

version-major version-minor version-patch:: lint check test build
	@npm version $(@:version-%=%)

publish::
	@npm publish
	@git push --tags origin HEAD:master

clean::
	@rm -rf lib

lib/%.js: src/%.js
	@echo "Building $<"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTIONS) -o $@ $<
