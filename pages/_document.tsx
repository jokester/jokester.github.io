import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {/* css links here */}
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.5,minimum-scale=0.8" />
          <script
            src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.3/build/highlight.min.js"
            integrity="sha256-/2C3CAfmuTGkUqK2mVrhkTacBscoR1caE0u2QZZ3Uh8="
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.3/build/styles/zenburn.min.css"
            integrity="sha256-PoSwmT0qo1TnhAiR+VNuzo5R3zGW2n9jXuEq/dSChwA="
            crossOrigin="anonymous"
          />
        </Head>
        <body className="overflow-y-scroll">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
