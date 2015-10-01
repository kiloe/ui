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

src/icons: material-design-icons | node_modules
	rm -rf $@.build
	mkdir $@.build
	for filename in `ls material-design-icons/**/svg/production/*.svg`; do \
		node svg_to_icon.js $$filename; \
	done
	mv $@.build $@

#--------------------------------------

demo: node_modules src/icons
	npm run demo

#--------------------------------------

clean:
	rm -f npm-debug.log
	rm -f demo/public/index.js
	rm -rf node_modules
	rm -rf src/icons.build
	rm -rf lib

distclean: clean
	rm -rf src/icons
	rm -rf material-design-icons

#--------------------------------------

.PHONY: default test demo clean distclean
