.PHONY: bundle build

# use for production, but forfeit sourcemapping (mapping doesn't work yet)
build:
	@browserify -t reactify index.jsx -d -p [minifyify --map build.map.json --output build/build.map.json] > build/build.js
	@cat css/*\.css > build/build.css
	@yuicompressor build/build.css -o build/build.css
	@echo browserified, reactified, minifyified

# build:
# 	@browserify -t reactify index.jsx | uglifyjs > build/build.min.js
# 	@echo Built

# use for non-production (unminified) deployment with sourcemapping
bundle:
	@browserify -t reactify index.jsx -d -o build/build.js
	@cat css/*\.css > build/build.css
	@echo browserified, reactified

# build: bundle
# 	@uglifyjs build/build.js -o build/build.js --source-map build/build.js.map
# 	@echo Built
