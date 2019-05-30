import React, { useState } from 'react';
import _ from 'lodash';
import getClassNames from 'classnames';
import getConfig from 'next/config';
import AuthConsumer from './Auth';


const { publicRuntimeConfig } = getConfig();
const { STATIC_PATH } = publicRuntimeConfig;

export default () => {
  const [isNavOpen, updateNavState] = useState(false);

  return (
    <AuthConsumer>
      {({ user, authHelpers }) => (
        <nav className="nav">
          <div className="nav__left">
            <img src={`${STATIC_PATH}/static/images/logo.svg`} alt="Logo" className="nav__logo" />
          </div>
          <div className="nav__right">
            <a href="/" className="nav__link">Home</a>
            {_.isEmpty(user) ? <a href="/login" className="nav__link">Login</a> : null}
            {/* {_.isEmpty(user) ? <a href="/signup">Sign Up</a> : null} */}
            {!_.isEmpty(user) ? <a href="/settings" className="nav__link">Settings</a> : null}
            {!_.isEmpty(user) ? (
              <span className="nav__link">
                {user.name}
                -
                <a onClick={() => { authHelpers.onLogout(); }}>Logout</a>
              </span>
            ) : null}
          </div>

          <div className="nav__mobile">
            <div className="nav__toggle" onClick={() => { updateNavState(!isNavOpen); }}>
              {isNavOpen ? (<i className="fa fa-times" />) : (<i className="fa fa-bars" />)}
            </div>
            <div
              className={getClassNames('nav__drawer', {
                'nav__drawer--open': isNavOpen,
              })}
            >
              <a href="/" className="nav__drawer-link">Home</a>
              {_.isEmpty(user) ? <a href="/login" className="nav__drawer-link">Login</a> : null}
              {/* {_.isEmpty(user) ? <a href="/signup">Sign Up</a> : null} */}
              {!_.isEmpty(user) ? <a href="/settings" className="nav__drawer-link">Settings</a> : null}
              {!_.isEmpty(user) ? (
                <span className="nav__drawer-link">
                  {user.name}
                  -
                  <a onClick={() => { authHelpers.onLogout(); }}>Logout</a>
                </span>
              ) : null}
            </div>
          </div>
        </nav>
      )}
    </AuthConsumer>
  );
};
