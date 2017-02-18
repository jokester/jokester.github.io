
preview: bundle
	bundle exec jekyll serve

compile: bundle
	bundle exec jekyll build
	
bundle:
	type bundle || gem install bundler
	bundle --path=.bundle
