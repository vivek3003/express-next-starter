import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import _ from 'lodash';
import Cookies from 'js-cookie';
import languages from '../lang/index';
import { login } from '../ui/utils/api';
import '../static/scss/pages/home.scss';


const { publicRuntimeConfig } = getConfig();
const { STATIC_PATH, CURRENT_LANG } = publicRuntimeConfig;
const LANGUAGE = languages[CURRENT_LANG] || languages.EN;

const Login = ({ next = '/' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      const loginData = await login(email, password);
      const user = _.get(loginData.data, 'data.user');
      const token = _.get(loginData.data, 'data.token');

      Cookies.set('user', user, { expires: 7 });
      Cookies.set('token', token, { expires: 7 });

      window.location.href = next;
    } catch (e) {
      console.error(_.get(e, 'response.data.code'));
    }
  };

  return (
    <div className="login">
      <img src={`${STATIC_PATH}/static/images/logo.svg`} alt="Logo" />
      <form>
        <input
          placeholder="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(e) => { e.preventDefault(); onLogin(); }}>{LANGUAGE.LOGIN}</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  next: PropTypes.string,
};

export default Login;
