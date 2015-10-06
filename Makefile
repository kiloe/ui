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
DEMO_SRCS = $(wildcard demo/src/**/*.js)

#--------------------------------------

package/%.js: src/%.js node_modules
	@mkdir -p $(dir $@)
	$(BABEL) -o $@ $<

package/icons: | node_modules
	$(BABEL) -d package/icons src/icons

package/package.json: package.json
	@mkdir -p $(dir $@)
	sed '/private/d' < $< > $@

package/.npmignore: .npmignore
	@mkdir -p $(dir $@)
	cp $< $@

package: package/package.json $(ES5) package/.npmignore package/icons

#---------------------------------------

# install node_modules
node_modules: package.json
	npm install

#--------------------------------------

icons: | node_modules
	git clone https://github.com/google/material-design-icons.git
	mkdir -p src/$@.build
	for filename in `ls material-design-icons/**/svg/production/*.svg`; do \
		node svg_to_icon.js $$filename; \
	done
	rm -rf material-design-icons
	mv src/$@.build src/$@

#--------------------------------------

demo/src/all.js: $(shell find src -type f -name '*.js' | grep -v 'utils' | grep -v 'index')
	@echo "// This file is generated during build - do not modify" > $@
	@echo "import React from 'react'" >> $@
	@echo "window.__React = React;" >> $@
	@for src in `find src -type f -name '*.js' | grep -v 'utils' | grep -v 'index'`; do \
		klass=`basename $$src .js`; \
		path="$${src/src/..\/..\/package}"; \
		echo "import $$klass from '$$path';" >> $@; \
	done
	@echo "let all = {" >> $@
	@for src in `find src -type f -name '*.js' | grep -v 'utils' | grep -v 'index'`; do \
		klass=`basename $$src .js`; \
		echo "$$klass," >> $@; \
	done
	@echo "};" >> $@
	@echo "export default all;" >> $@
	@echo "window._allUI = all;" >> $@
	@echo "export function exec(src){" >> $@
	@echo "src = 'var React = window.__React;' + src;" >> $@
	@echo "src = 'var ' + Object.keys(all).map(k => k+'=window._allUI.'+k).join(',') + ';' + src;" >> $@
	@echo "return window.eval(src) }" >> $@
	@echo $@

demo/public/index.js: demo/src/index.js $(DEMO_SRCS) demo/src/all.js package | node_modules
	$(BROWSERIFY) -t babelify $< -o $@

demo: demo/public/index.js | node_modules
	$(SERVE) demo/public

demo_and_reload: demo/public/index.js
	CUR_WID=`xdotool getwindowfocus`; \
		xdotool windowactivate `xdotool search --onlyvisible --class google-chrome|head -1` \
		&& xdotool key 'ctrl+r' \
		&& xdotool windowactivate $$CUR_WID

watch: demo/public/index.js
	@envsubst < .watchsrc | watchman -j
	@envsubst < .watchdemo | watchman -j
	@echo
	@echo "+-------------------------------------------------+"
	@echo "| watching ./src in background                    |"
	@echo "| running 'make demo/public/index.js' on change   |"
	@echo "+-------------------------------------------------+"
	@echo
	@echo "Run 'make unwatch' to stop"

unwatch:
	@watchman watch-del ./src >/dev/null
	@watchman watch-del ./demo/src >/dev/null
	@watchman trigger-del kiloe-ui-src >/dev/null
	@echo "OK stopped watching"

#--------------------------------------

publish: package
	npm version patch
	sed '/private/d' < package.json > $@
	cd package && npm publish

#--------------------------------------

clean:
	rm -f npm-debug.log
	rm -f demo/public/index.js
	rm -f demo/src/all.js
	rm -f demo/src/all.js.tmp
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

.PHONY: default test demo clean distclean publish watch unwatch package icons demo_and_reload

