---
title: 'Memo: pdf creation in browser'
publishAt: 2017-09-01
slug: memo-pdf-creation-in-browser
---

When working on a svg-based document viewer in browser, I had a chance to make a pdf-export feature.
This post is a memo about caveats and findings in my quest.

- toc
  {:toc}

## Background

A brief <!-- and NDA-compliant--> introduction of the viewer I work on:

- A multipage document viewer running in browser.
- Each page may have a background image in svg format.
- Each page may have multiple vector annotations: text / circle / rect / handdrawn track.
- Annotations can be edited on the fly, and get synchronized between connected clients.

## How to create pdf in browser

We used 2 libraries:

- [devongovett/pdfkit](https://github.com/devongovett/pdfkit) to create pdf blob
- [alafr/SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit) to draw svg image to pdf

### bundle pdfkit for browser use

- pdfkit has a [How to compile PDFKit for use in the browser](https://github.com/devongovett/pdfkit/wiki/How-to-compile-PDFKit-for-use-in-the-browser) guide in `github/pdfkit` wiki.
  - We did not take this way: use of `browserify coffeeify` would make our build (currently webpack only) more complicated.
- Or, use a webpack-only solution
  - in short: we resolve module dependencies with webpack `transform-loader`
  - some dependicies (that exists in node but not browser) are taken from [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake)
  - see my [jokester/random-hack](https://github.com/jokester/random-hack/tree/master/pdfkit-webpack) repo for a minimal working example.

### draw svg to pdf

- We used [alafr/SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit)
  - internally, this library traversals DOM of svg and draws equivalent vector image with `pdfkit`.
  - If the svg input is a string, a pure js svg parser will be used to build a DOM.
    - This should work in both browser and node
    - _Caveat_: this svg parser _does not_ recognize svg strings start with `<?xml version="1.0" encoding="UTF-8">`. We have to strip this before passing it to `SVGtoPDF()`.
    - _Note_: `style` attribute in svg string will not be intepreted. If your svg makes use of `style=`, you have to use `SVGElement` input and `useCSS` option. In that case SVG-to-PDFKit uses native `getComputedStyle` to have browser interprete the style.
  - The svg input can also be a `SVGElement` object. Such objects can be obtained from `HTMLObjectElement#getSVGDocument()` `HTMLEmbedElement#getSVGDocument()` or [XMLHttpRequest](https://stackoverflow.com/a/14070928/327815).
    - This likely requires a browser to work.
    - _Caveat_: chrome may set incorrect prototype for native `SVGElement`, see [this issue](https://github.com/alafr/SVG-to-PDFKit/issues/47) for inspection and a workaround.

### remove font data from pdfkit

- pdfkit and dependencies have more than 1MB (almost not compressable) font data.
- If you do not call `pdfDocument.text()`, they should be removed from JavaScript bundle.

### draw not-in-font text to pdf

### Browser compatibility

pdfkit needs some newer API to deal with binary data. Most browser (effectively everyone except IE) should work fine. The following list shows key features we needed.

- `IE >= 9`:
  - Canvas: for bitmap drawing
  - CSS (2d) transform: zoom and scroll DOM element with a transform matrix
- `IE >= 10`:
  - Blob / ArrayBuffer / TypedArray: handle binary data in browser
  - createObjectURL: can be used to cache arbitrary data (e.g. prefetched svg of all pages)
    - Caveat: blob URLs in IE / Edge look like `blob:UUID`, and cannot be used as resource of object / embed elements.
  - FileReader: read string or ArrayBuffer out of a Blob object

### Reduce bundled size of pdfkit

<!-- TODO -->

## How to inspect / debug created pdf

### By looking at pdf object

The Vector images are stored as _object_ in a pdf file.
We can read them after decoding them to textual form.

- see [PDF Stream Objects](https://blog.didierstevens.com/2008/05/19/pdf-stream-objects/) for a brief introduction of encoded objects.
- the decode can be done with `qpdf`: [example](https://stackoverflow.com/a/29474423/327815).

Reference:

- [Understanding the PDF file format – How Are Images Stored](https://blog.idrsolutions.com/2010/04/understanding-the-pdf-file-format-how-are-images-stored/)
- [apache fop](https://xmlgraphics.apache.org/fop/) is able to [embed svg in its own xml scheme](https://xmlgraphics.apache.org/fop/dev/fo/embedding.fo.pdf), that can be exported to pdf with fop itself.
- [itext/rups](https://github.com/itext/rups/) PDF Inspection tool

### By converting to svg again

We can also convert pdf to svg again, to see if that is correct (I found it much easier to inspect text and DOM of svg).

- `pdfcairo` can convert 1-paged pdf to svg: [example]()
- `InkScape` should be able to do the same.

## TypeScript - related stuff
