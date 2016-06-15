
.phony: compile

compile: bundle
	bundle exec nanoc compile

publish:
	bash publish.sh

guard: bundle
	bundle exec guard

view:
	bundle exec nanoc view
	
bundle:
	type bundle || gem install bundler
	bundle --path=.bundle

