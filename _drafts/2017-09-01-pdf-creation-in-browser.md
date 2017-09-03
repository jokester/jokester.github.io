---
title: "Memo: pdf creation in browser"
---

When working on a svg-based document viewer in browser, I had a chance to make a pdf-export feature.
This post is a memo about caveats and findings in my quest.

### How to create pdf with JavaScript

- We used [devongovett/pdfkit](https://github.com/devongovett/pdfkit) and [alafr/SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit)

### How to bundle pdfkit for browser use

- found [How to compile PDFKit for use in the browser](https://github.com/devongovett/pdfkit/wiki/How-to-compile-PDFKit-for-use-in-the-browser) in `github/pdfkit` wiki.
    - did not go this way: use of `browserify coffeeify` would make our webpack-only build more complicated.
- used a webpack-only solution
    - in short: we resolve module dependencies with webpack `transform-loader`
    - see my [jokester/random-hack](https://github.com/jokester/random-hack/tree/master/pdfkit-webpack) repo for a minimal working example.

### How to create vector image in pdf, from svg

- used [alafr/SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit)
    - internally, it traversals DOM of svg and output vector image with `pdfkit`.
    - If the svg input is a string, a pure js svg parser will be used to build DOM.
        - *Caveat*: this svg parser *does not* recognize svg strings start with `<?xml version="1.0" encoding="UTF-8">`. We have to strip this before passing it to `SVGtoPDF()`.
    - The svg input can also be a `XMLDocument` object. Such objects can be obtained from `HTMLObjectElement#getSVGDocument()` `HTMLEmbedElement#getSVGDocument()` or [XMLHttpRequest](https://stackoverflow.com/a/14070928/327815).

### How to inspect vector graphics in pdf - 1

The Vector images are stored as *object* in a pdf file.
We can read them after decoding them to textual form.

- see [PDF Stream Objects](https://blog.didierstevens.com/2008/05/19/pdf-stream-objects/) for a brief introduction of encoded objects.
- the decode can be done with `qpdf`: [example](https://stackoverflow.com/a/29474423/327815).

## How to inspect vector image in pdf - 2

We can also convert pdf to svg again, to see if that is correct (I found it much easier to inspect text and DOM of svg).

- `pdfcairo` can convert 1-paged pdf to svg: [example]()
- `InkScape` should be able to do the same.


### Rest

Did not used them all, but they still contain useful information on svg and pdf.

- [Understanding the PDF file format – How Are Images Stored](https://blog.idrsolutions.com/2010/04/understanding-the-pdf-file-format-how-are-images-stored/)
- [apache fop](https://xmlgraphics.apache.org/fop/) is able to [embed svg in its own xml scheme](https://xmlgraphics.apache.org/fop/dev/fo/embedding.fo.pdf), that can be exported to pdf with fop itself.
- [itext/rups](https://github.com/itext/rups/) PDF Inspection tool


