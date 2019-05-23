import React from 'react';
import _ from 'lodash';
import App, { Container } from 'next/app';
import { Auth } from '../ui/components/Auth';


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    const user = _.get(ctx, 'req.user', {});

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, user };
  }

  render() {
    const { Component, pageProps, user } = this.props;

    return (
      <Auth user={user}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Auth>
    );
  }
}

export default MyApp;
