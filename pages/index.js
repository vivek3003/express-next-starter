import React from 'react';
import getConfig from 'next/config';
import languages from '../lang/index';
import Nav from '../ui/components/Nav';
import '../static/scss/pages/home.scss';

const { publicRuntimeConfig } = getConfig();
const { STATIC_PATH, CURRENT_LANG } = publicRuntimeConfig;
const LANGUAGE = languages[CURRENT_LANG] || languages.EN;

export default () => (
  <div className="home">
    <Nav />
    <img src={`${STATIC_PATH}/static/images/logo.svg`} alt="Logo" />
    <h1>{LANGUAGE.TITLE}</h1>
  </div>
);
