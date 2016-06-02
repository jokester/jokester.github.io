
.phony: compile

compile: bundle clean
	bundle exec nanoc compile

clean:
	rm -rf output

guard: bundle
	bundle exec guard
	
bundle:
	type bundle || gem install bundler
	bundle --path=.bundle

