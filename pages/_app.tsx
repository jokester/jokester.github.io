import React from 'react';
import App from 'next/app';
import '../src/app.scss';

export default class extends App {
  static getInitialProps = App.getInitialProps;

  render(): React.ReactElement {
    const { Component } = this.props;
    const pageProps = {
      ...this.props.pageProps,
    };

    return (
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    );
  }
}
