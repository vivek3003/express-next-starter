import React from 'react';
import getConfig from 'next/config';
import languages from '../lang/index';
import Nav from '../ui/components/Nav';
import '../static/scss/pages/settings.scss';

const { publicRuntimeConfig } = getConfig();
const { CURRENT_LANG } = publicRuntimeConfig;
const LANGUAGE = languages[CURRENT_LANG] || languages.EN;

export default () => (
  <div className="settings">
    <Nav />
    <main className="settings__main">
      <h1>{LANGUAGE.SETTINGS_TITLE}</h1>
      <p>This page is private. Accessible only via login.</p>
    </main>
  </div>
);
