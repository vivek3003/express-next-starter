import React from 'react';
import getConfig from 'next/config';
import '../static/scss/pages/home.scss';

const { publicRuntimeConfig } = getConfig();
const { STATIC_PATH } = publicRuntimeConfig;

export default () => (
  <div className="home">
    <img src={`${STATIC_PATH}/static/images/logo.svg`} />
    <h1>Hello World, this is cool</h1>
  </div>
)
