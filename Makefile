default: package

#--------------------------------------

SHELL := /bin/bash
PWD := $(shell pwd)
ES6 := $(wildcard src/*.js)
ES6 += $(wildcard src/utils/*.js)
ES5 := $(addprefix package/,$(ES6:src/%=%))
BABEL := ./node_modules/.bin/babel
BROWSERIFY := ./node_modules/.bin/browserifyinc --cachefile .browserifycache
SERVE := ./node_modules/.bin/http-server
DEMO_SRCS = $(filter-out demo/src/IconList.js, $(wildcard demo/src/**/*.js))

#--------------------------------------

package/%.js: src/%.js node_modules
	@mkdir -p $(dir $@)
	$(BABEL) -o $@ $<

package/icons: src/icons node_modules
	$(BABEL) -d package/icons src/icons

package/package.json: package.json
	@mkdir -p $(dir $@)
	sed '/private/d' < $< > $@

package/.npmignore: .npmignore
	@mkdir -p $(dir $@)
	cp $< $@

package: package/package.json package/icons $(ES5) package/.npmignore

#---------------------------------------

# install node_modules
node_modules: package.json
	npm install

#--------------------------------------

src/icons: node_modules
	git clone https://github.com/google/material-design-icons.git
	mkdir -p $@.build
	for filename in `ls material-design-icons/**/svg/production/*.svg`; do \
		node svg_to_icon.js $$filename; \
	done
	rm -rf material-design-icons
	mv $@.build $@

#--------------------------------------

demo/src/IconList.js: src/icons
	echo '' > $@.tmp
	for path in `ls $</*.js`; do \
		filename=`basename $$path`; \
		klass=`basename $$filename .js`; \
		echo "import $$klass from '../../package/icons/$$filename';" >> $@.tmp; \
	done
	echo "" >> $@.tmp
	echo "export const ICONS = [" >> $@.tmp
	for path in `ls $</*.js`; do \
		filename=`basename $$path`; \
		klass=`basename $$filename .js`; \
		echo "  $$klass," >> $@.tmp; \
	done
	echo "]" >> $@.tmp
	mv $@.tmp $@

demo/public/index.js: demo/src/index.js $(DEMO_SRCS) demo/src/IconList.js package node_modules
	$(BROWSERIFY) -t babelify $< -o $@

demo: demo/public/index.js node_modules
	$(SERVE) demo/public

watch: demo/public/index.js
	envsubst < .watchsrc | watchman -j
	envsubst < .watchdemo | watchman -j
	@echo
	@echo "+-------------------------------------------------+"
	@echo "| watching ./src in background                    |"
	@echo "| running 'make demo/public/index.js' on change   |"
	@echo "+-------------------------------------------------+"
	@echo
	@echo "Run 'make unwatch' to stop"

unwatch:
	watchman watch-del ./src
	watchman watch-del ./demo/src
	watchman trigger-del kiloe-ui-src

#--------------------------------------

publish: package
	npm version patch
	sed '/private/d' < package.json > $@
	cd package && npm publish

#--------------------------------------

clean:
	rm -f npm-debug.log
	rm -f demo/public/index.js
	rm -f demo/src/IconList.js
	rm -f demo/src/IconList.js.tmp
	rm -rf src/icons.build
	rm -f .browserifycache
	rm -rf package

distclean: clean
	rm -rf node_modules
	rm -rf src/icons
	rm -rf material-design-icons

#--------------------------------------

.PHONY: default test demo clean distclean publish watch unwatch package

