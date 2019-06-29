import React from 'react';
import getConfig from 'next/config';
import _ from 'lodash';
import languages from '../lang/index';
import Nav from '../ui/components/Nav';
import AuthConsumer from '../ui/components/Auth';
import '../static/scss/pages/home.scss';

const { publicRuntimeConfig } = getConfig();
const { CURRENT_LANG } = publicRuntimeConfig;
const LANGUAGE = languages[CURRENT_LANG] || languages.EN;

export default () => (
  <div className="home">
    <Nav />
    <AuthConsumer>
      {
        ({ user }) => (
          <main className="home__main">
            <h1>{LANGUAGE.TITLE}</h1>
            {
              _.isEmpty(user) ? (
                <h2>Login for a personalized experiece</h2>
              ) : (<h2>Hello {_.get(user, 'name')}, You are now logged in.</h2>)
            }
          </main>
        )
      }
    </AuthConsumer>
  </div>
);
