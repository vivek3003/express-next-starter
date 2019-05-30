import React from 'react';
import getConfig from 'next/config';
import languages from '../lang/index';
import Nav from '../ui/components/Nav';
import '../static/scss/pages/home.scss';

const { publicRuntimeConfig } = getConfig();
const { CURRENT_LANG } = publicRuntimeConfig;
const LANGUAGE = languages[CURRENT_LANG] || languages.EN;

export default () => (
  <div className="settings">
    <Nav />
    <main className="settings__main">
      <h1>{LANGUAGE.SETTINGS_TITLE}</h1>
    </main>
  </div>
);
