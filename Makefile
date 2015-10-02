default: package

#--------------------------------------

SHELL := /bin/bash
PWD := $(shell pwd)
ES6 := $(wildcard src/**/*.js)
ES5 := $(addprefix package/,$(ES6:src/%=%))
BABEL := ./node_modules/.bin/babel
BROWSERIFY := ./node_modules/.bin/browserifyinc --cachefile .browserifycache
SERVE := ./node_modules/.bin/http-server
DEMO_SRCS = $(filter-out demo/src/IconList.js, $(wildcard demo/src/**/*.js))

#--------------------------------------

package/%.js: src/%.js src/icons
	@mkdir -p $(dir $@)
	$(BABEL) -o $@ $<

package/package.json: package.json src/icons
	@mkdir -p $(dir $@)
	$(BABEL) -d $(dir $@)/ src/ # this line is not required but drastically speeds up initial build
	sed '/private/d' < $< > $@

package/.npmignore: .npmignore
	@mkdir -p $(dir $@)
	cp $< $@

package: package/package.json package/.npmignore $(ES5)

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
		echo "import $$klass from '../../package/icons/$$filename';" >> $@.tmp; \
	done
	echo "" >> $@.tmp
	echo "export const ICONS = [" >> $@.tmp
	for klass in `ls $</ | sed 's/\.js//'`; do \
		echo "  $$klass," >> $@.tmp; \
	done
	echo "]" >> $@.tmp
	mv $@.tmp $@

demo/public/index.js: demo/src/index.js $(DEMO_SRCS) demo/src/IconList.js package
	$(BROWSERIFY) -t babelify $< -o $@

demo: demo/public/index.js
	$(SERVE) demo/public

#--------------------------------------

publish: package
	npm version patch && cp package.json package/
	cd package && npm publish

#--------------------------------------

clean:
	rm -f npm-debug.log
	rm -f demo/public/index.js
	rm -f demo/src/IconList.js
	rm -f demo/src/IconList.js.tmp
	rm -rf node_modules
	rm -rf src/icons.build
	rm -f .browserifycache
	rm -rf package

distclean: clean
	rm -rf src/icons
	rm -rf material-design-icons

#--------------------------------------

.PHONY: default test demo clean distclean publish
