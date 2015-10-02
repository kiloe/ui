default: lib $(ES5)

#--------------------------------------

SHELL := /bin/bash
PWD := $(shell pwd)
ES6 := $(wildcard src/**/*.js)
ES5 := $(addprefix lib/,$(ES6:src/%=%))
BABEL := ./node_modules/.bin/babel
BROWSERIFY := ./node_modules/.bin/browserifyinc --cachefile .browserifycache
DEMO_SRCS = $(filter-out demo/src/IconList.js, $(wildcard demo/src/**/*.js))

#--------------------------------------

# es6 -> es5
lib/%.js: src/%.js src/icons | node_modules
	@mkdir -p $(dir $@)
	$(BABEL) -o $@ $<

lib: src/icons | node_modules
	$(BABEL) -d lib/ src/

#---------------------------------------

# install node_modules
node_modules: package.json
	npm install

#--------------------------------------

material-design-icons:
	git clone https://github.com/google/material-design-icons.git

src/icons: material-design-icons svg_to_icon.js | node_modules
	rm -rf $@.build
	mkdir $@.build
	for filename in `ls $</**/svg/production/*.svg`; do \
		node svg_to_icon.js $$filename; \
	done
	mv $@.build $@

#--------------------------------------

demo/src/IconList.js: src/icons
	echo '' > $@.tmp
	for filename in `ls $</`; do \
		klass=`basename $$filename .js`; \
		echo "import $$klass from '../../src/icons/$$filename';" >> $@.tmp; \
	done
	echo "" >> $@.tmp
	echo "export const ICONS = [" >> $@.tmp
	for klass in `ls $</ | sed 's/\.js//'`; do \
		echo "  $$klass," >> $@.tmp; \
	done
	echo "]" >> $@.tmp
	mv $@.tmp $@

demo/public/index.js: demo/src/index.js $(DEMO_SRCS) lib $(ES5) demo/src/IconList.js
	$(BROWSERIFY) -t babelify $< -o $@

demo: demo/public/index.js
	npm run demo

#--------------------------------------

publish: lib $(ES5)
	npm version patch
	npm publish

#--------------------------------------

clean:
	rm -f npm-debug.log
	rm -f demo/public/index.js
	rm -f demo/src/IconList.js
	rm -f demo/src/IconList.js.tmp
	rm -rf node_modules
	rm -rf src/icons.build
	rm -rf lib
	rm -f .browserifycache

distclean: clean
	rm -rf src/icons
	rm -rf material-design-icons

#--------------------------------------

.PHONY: default test demo clean distclean publish
