preview: bundle
	bundle exec jekyll serve --host 0.0.0.0

drafts: bundle
	bundle exec jekyll serve --host 0.0.0.0 --drafts

compile: bundle
	bundle exec jekyll build
	
bundle:
	type bundle || gem install bundler
	bundle --path=.bundle
