import React from 'react';
import _ from 'lodash';
import AuthConsumer from './Auth';

export default () => (
  <AuthConsumer>
    {({ user, authHelpers }) => (
      <nav>
        <a href="/">Home</a>
        {_.isEmpty(user) ? <a href="/login">Login</a> : null}
        {/* {_.isEmpty(user) ? <a href="/signup">Sign Up</a> : null} */}
        {!_.isEmpty(user) ? <span>{user.name}</span> : null}
        {!_.isEmpty(user) ? <a onClick={() => { authHelpers.onLogout(); }}>Logout</a> : null}
      </nav>
    )}
  </AuthConsumer>
);
