preview: bundle
	bundle exec jekyll serve --host 0.0.0.0

preview-drafts: bundle
	bundle exec jekyll serve --host 0.0.0.0 --drafts

preview0: bundle
	bundle exec jekyll serve --host=0.0.0.0

compile: bundle
	bundle exec jekyll build
	
bundle:
	type bundle || gem install bundler
	bundle --path=.bundle
