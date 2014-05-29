test:
	clear && mocha --require chai --recursive --reporter spec --slow 1 -t 5000

coveralls:
	istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec --recursive --require chai --recursive --reporter spec --slow 1 -t 5000 && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage

.PHONY: test