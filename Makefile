default: all

#--------------------------------------

SHELL := /bin/bash
PWD := $(shell pwd)

#--------------------------------------

all: lib

#--------------------------------------

# install node_modules
node_modules: package.json
	npm install

# compile
lib: node_modules src/icons
	npm run compile

#---------------------------------------

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
	echo "import React from 'react';" > $@
	for filename in `ls src/icons/`; do \
		klass=`basename $$filename .js`; \
		echo "import $$klass from '../../src/icons/$$filename';" >> $@; \
	done
	echo "" >> $@
	echo "export const ICONS = [" >> $@
	for klass in `ls src/icons/ | sed 's/\.js//'`; do \
		echo "  <$$klass scale={3}/>," >> $@; \
	done
	echo "]" >> $@

demo: node_modules src/icons demo/src/IconList.js
	npm run demo

#--------------------------------------

clean:
	rm -f npm-debug.log
	rm -f demo/public/index.js
	rm -f demo/src/IconList.js
	rm -rf node_modules
	rm -rf src/icons.build
	rm -rf lib

distclean: clean
	rm -rf src/icons
	rm -rf material-design-icons

#--------------------------------------

.PHONY: default test demo clean distclean
