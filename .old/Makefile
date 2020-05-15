preview: bundle
	bundle exec jekyll serve --host 127.0.0.1

preview-drafts: bundle
	bundle exec jekyll serve --host 127.0.0.1 --drafts

preview0: bundle
	bundle exec jekyll serve --host=127.0.0.1

compile: bundle
	bundle exec jekyll build
	
bundle:
	type bundle || gem install bundler
	bundle --path=.bundle
