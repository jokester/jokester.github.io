import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {/* css links here */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.5,minimum-scale=1" />
        </Head>
        <body className="overflow-y-scroll">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
