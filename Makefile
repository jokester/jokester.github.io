
.phony: compile

compile: bundle
	bundle exec nanoc compile

publish: compile
	bash publish.sh

guard: bundle
	bundle exec guard
	
bundle:
	type bundle || gem install bundler
	bundle --path=.bundle

